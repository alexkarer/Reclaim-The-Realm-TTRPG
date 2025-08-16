import { RtRActor } from "./actor.mjs";

const { api } = foundry.applications;

/**
 * Extend the basic Item Document
 * @extends {Item}
 */
export class RtRItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Starts off by populating the roll data with a shallow copy of `this.system`
    const rollData = { ...this.system };

    // Quit early if there's no parent actor
    if (!this.actor) return rollData;

    // If present, add the actor's roll data
    rollData.actor = this.actor.getRollData();

    return rollData;
  }

  /**
   * @returns {boolean} Returns true if the item is an ability, false otherwise.
   */
  isAbility() {
    return this.type === 'ability' ||
      this.type === 'spell' ||
        this.type === 'classTechnique' ||
        this.type === 'martialManeuver' ||
        this.type === 'npcAbility';
  }

  /* -------------------------------------------- */
  /*  Ability Methods                             */
  /* -------------------------------------------- */

  /**
   * Use an ability.
   */
  async useAbility() {
    if (game.paused) {
      ui.notifications.warn("Abilities can't be used while the game is paused.", {console: true});
      return;
    }
    if (!this.isAbility()) {
      console.warn(`Item ${this.name} is not an ability and cannot be used.`);
      return;
    }
    const parentActor = this.parent;
    if (!parentActor) {
      console.warn(`Item ${this.name} has no parent actor to use the ability.`);
      return;
    }

    const useAbility = await parentActor.payAbilityUsageCosts(this.system.usageCost);
    if (!useAbility) {
      return false;
    }
    this._renderUsingAbilityChatMessage(parentActor);

    if (this.type === 'spell') {
      const castSuccessful = await parentActor.castSpell(this.system.spellDifficulty, this.name);
      if (!castSuccessful) return;
    }

    let targets = game.user.targets;

    if (this.system.actions.length > 0) {
      /*if (this.system.actions[0].targets === 'self') {
        const selfTarget = new Set();
        if (parentActor.isToken) {
          selfTarget = parentActor.token;
        } else if (parentActor.getActiveTokens(false, true).length > 1) {
          selfTarget.add(parentActor.getActiveTokens(false, true)[0]);
        }
        targets = selfTarget;
      }*/
      switch (this.system.actions[0].actionType) {
        case 'meleeMartialAttack':
        case 'meleeSpellAttack':
        case 'rangedMartialAttack':
        case 'rangedSpellAttack':
          await this._handleAttackAction(parentActor, this.system.actions[0], targets);
          break;
        case 'martialTest':
          this._handleMartialTestAction(parentActor, this.system.actions[0], targets);
          break;
        case 'spellTest':
          this._handleSpellTestAction(parentActor, this.system.actions[0], targets);
          break;
        case 'always':
          this._handleAlwaysActions(parentActor, this.system.actions[0], targets);
          break;
        default:
          console.warn(`Unknown action type: ${this.system.actions[0].actionType}`);
          break;
      }
    }
  }

  /**
   * Render an ability being used.
   * @param {RtRActor} parentActor 
   */
  _renderUsingAbilityChatMessage(parentActor) {
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: parentActor }),
        content: `
          <img style='display: inline; transform: translate(0, 5px);' src='${this.img}' title='${this.name}' width='18' height='18'/>
          <span>${parentActor.name} is using ${this.name}.</span>
        `,
        style: CONST.CHAT_MESSAGE_STYLES.OOC
    });
  }

  /**
   * Handle attack actions for abilities.
   * @param {RtRActor} parentActor 
   * @param {Object} action 
   * @param {Set<RtRToken>} targets
   * @private
   */
  async _handleAttackAction(parentActor, action, targets) {
    let unmodifiedResult = 0;
    let rollTotal = 0;
    if (action.fixed) {
      unmodifiedResult = action.fixedValue;
      rollTotal = action.fixedValue;
    } else {
      const attackResult = await this._makeActorAttack(parentActor, action.actionType);
      unmodifiedResult = attackResult?.rolls[0]?.terms[0]?.results[0]?.result;
      rollTotal = attackResult.rolls[0].total;
    }
    if (targets.size === 0) {
      this._handleAbilityResults(action.results, new Set(), parentActor);
    } else {
      const targetHitResults = targets.map(target => {
        const hitResults = [];
        hitResults.push(target.document.actor.determineAttackHit(rollTotal, unmodifiedResult ?? 10, parentActor.name));
        if (action.targetingSave) {
          hitResults.push(target.document.actor.determineDefensiveTestResult(action.targetingSave, rollTotal, parentActor.name));
        }
        return [target, hitResults];
      });
      
      this._renderAttackHitResult(parentActor, targetHitResults, rollTotal, action.targetingSave);
      this._handleAbilityResults(action.results, targetHitResults, parentActor);
    }
  }

  /**
   * Handle Spell test actions for abilities.
   * @param {RtRActor} parentActor 
   * @param {Object} action 
   * @param {Set<RtRToken>} targets
   * @private
   */
  async _handleSpellTestAction(parentActor, action, targets) {
    let testTotal = 0;
    if (action.fixed) {
      testTotal = action.fixedValue;
    } else {
      const spellTestResult = await parentActor.spellTest({attribute: action.attribute});
      testTotal = spellTestResult.rolls[0].total;
    }
    if (targets.size === 0) {
      this._handleAbilityResults(action.results, new Set(), parentActor);
    } else {
      const targetTestResults = targets.map(target => {
        const targetTestResult = target.document.actor.determineDefensiveTestResult(action.targetingSave, testTotal, parentActor.name);
        return [target, [targetTestResult]];
      });
      this._renderTestResult(parentActor, targetTestResults, testTotal, action.targetingSave, `${action.attribute} SPELL TEST`);
      this._handleAbilityResults(action.results, targetTestResults, parentActor);
    }
  }

  /**
   * Handle Martial test actions for abilities.
   * @param {RtRActor} parentActor 
   * @param {Object} action 
   * @param {Set<RtRToken>} targets
   * @private
   */
  async _handleMartialTestAction(parentActor, action, targets) {
    let testTotal = 0;
    if (action.fixed) {
      testTotal = action.fixedValue;
    } else {
      const martialTestResult = await parentActor.martialTest({attribute: action.attribute});
      testTotal = martialTestResult.rolls[0].total;
    }
    if (targets.size === 0) {
      this._handleAbilityResults(action.results, new Set(), parentActor);
    } else {
      const targetTestResults = targets.map(target => {
        let targetTestResult = target.document.actor.determineDefensiveTestResult(action.targetingSave, testTotal, parentActor.name);
        return [target, [targetTestResult]];
      });
      this._renderTestResult(parentActor, targetTestResults, testTotal, action.targetingSave, `${action.attribute} MARTIAL TEST`);
      this._handleAbilityResults(action.results, targetTestResults, parentActor);
    }
  }

  /**
   * Handle always Actions
   * @param {RtRActor} parentActor 
   * @param {Object} action 
   * @param {Set<RtRToken>} targets
   * @private
   */
  async _handleAlwaysActions(parentActor, action, targets) {
    if (targets.size === 0) {
      this._handleAbilityResults(action.results, new Set(), parentActor);
    } else {
      const targetHitResults = targets.map(target => {
        return [target, [Promise.resolve('always')]];
      });

      this._handleAbilityResults(action.results, targetHitResults, parentActor);
    }
  }

  /**
   * Render attack hit result
   * @param {RtRActor} parentActor 
   * @param {Set<[RtRToken, [Promise<string>]]} targetHitResults the targets that where hit
   * @param {Number} attackRoll
   * @param {string} targetingDefense the defense that is targeted ('STABILITY', 'DODGE', 'TOUGHNESS', 'WILLPOWER')
   */
  async _renderAttackHitResult(parentActor, targetHitResults, attackRoll, targetingDefense) {
    const hitResultsMessages = await Promise.all(targetHitResults.map(([token, resultPromises]) => {
      return Promise.all(resultPromises).then(hitResults => {
        if (hitResults.length === 1) {
           return Promise.resolve(`ATTACK (${attackRoll}) vs. ${token.name} -> ${hitResults[0]}`);
        } else {
          return Promise.resolve(`ATTACK (${attackRoll}) vs. ${token.name} (${targetingDefense}) -> ${hitResults.join(', ')}`);
        }
      })
    }));
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: parentActor }),
        content: `
          <div class="flexcol">
          ${hitResultsMessages.join(' ')}
          </div>
        `,
        style: CONST.CHAT_MESSAGE_STYLES.OOC
    });
  }

  /**
   * Render test result
   * @param {RtRActor} parentActor 
   * @param {Set<[RtRToken, [Promise<string>]]} targetTestResults the targets that where hit
   * @param {Number} testRoll
   * @param {string} targetingDefense the defense that is targeted ('STABILITY', 'DODGE', 'TOUGHNESS', 'WILLPOWER')
   * @param {string} testType
   */
  async _renderTestResult(parentActor, targetTestResults, testRoll, targetingDefense, testType) {
    const hitResultsMessages = await Promise.all(targetTestResults.map(([token, resultPromises]) => {
      return Promise.all(resultPromises).then(testResult => {
          return Promise.resolve(`${testType} (${testRoll}) vs. ${token.name} (${targetingDefense}) -> ${testResult[0]}`);
      });
    }));
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: parentActor }),
        content: `
          <div class="flexcol">
          ${hitResultsMessages.join(' ')}
          </div>
        `,
        style: CONST.CHAT_MESSAGE_STYLES.OOC
    });
  }

  /**
   * @param {RtRActor} parentActor 
   * @param {String} actionType 
   * @private
   * @returns {Roll | undefined} The result of the attack roll, or undefined if the action type is not recognized.
   */
  async _makeActorAttack(parentActor, actionType) {
    let attackResult;
    switch (actionType) {
      case 'meleeMartialAttack':
        attackResult = parentActor.meleeMartialAttack({});
        break;
      case 'meleeSpellAttack':
        attackResult = parentActor.meleeSpellAttack({});
        break;
      case 'rangedMartialAttack':
        attackResult = parentActor.rangedMartialAttack({});
        break;
      case 'rangedSpellAttack':
        attackResult = parentActor.rangedSpellAttack({});
        break;
      default:
        console.error('Not an attack action', action, this);
        break;
    }
    return attackResult;
  }

  /**
   * @param {[Object]} actionResults defined action results of ability 
   * @param {Set<[RtRToken, [Promise<string>]]} targetHitResults the targets that where hit
   * @param {RtRActor} parentActor that owns the item
   */
  async _handleAbilityResults(actionResults, targetHitResults, parentActor) {
    if (actionResults.size === 0) {
      console.warn(`No Results defined for ability ${this.name}`);
    }

    if (targetHitResults.size === 0) {
      let actionResultContent = actionResults.map(result => this._createAbilityResultRadioOption(result)).join(' ');
      const confirm = await api.DialogV2.input({
          content: `<fieldset><legend>Select ${this.name} Result:</legend>${actionResultContent}</fieldset>`,
          rejectClose: false,
          modal: true,
          window: { title: `Ability ${this.name}` }
      });
      if (!confirm) {
          return false;
      }
      const chosenResult = actionResults.find(r => r.condition === confirm.condition);
      if (!chosenResult) {
        console.error(`Ability Result ${confirm.condition} in Ability ${this.name} not found!`);
        return;
      }

      switch(chosenResult.type) {
        case 'damage':
          this._makeDamageRoll(chosenResult, parentActor);
          break;
        case 'statusEffect':
          this._renderStatusEffectAppliedChatMessage(chosenResult.statusEffectToApply, parentActor);
          break;
        case 'damageAndStatusEffect':
          this._makeDamageRoll(chosenResult, parentActor);
          this._renderStatusEffectAppliedChatMessage(chosenResult.statusEffectToApply, parentActor);
          break;
        case 'heal':
          parentActor.roll(chosenResult.healFormula, {type: game.i18n.localize(CONFIG.RTR.abilityResultType[chosenResult.type])});
          break;
        case 'healAndStatusEffect':
          parentActor.roll(chosenResult.healFormula, {type: game.i18n.localize(CONFIG.RTR.abilityResultType[chosenResult.type])});
          this._renderStatusEffectAppliedChatMessage(chosenResult.statusEffectToApply, parentActor);
          break;
        default:
          console.error(`Chosen Result Type '${chosenResult.type}' handling not defined`)
      }

    } else {
      targetHitResults.forEach(([token, resultPromises]) => {
        resultPromises.forEach(promise => promise.then(hitResult => {
          const foundResult = actionResults.find(r => r.condition === hitResult);
          if (!foundResult) {
            console.warn(`Ability Result ${hitResult} in Ability ${this.name} not found!`);
            return;
          }
          switch(foundResult.type) {
            case 'damage':
              this._makeDamageRoll(foundResult, parentActor).then(rollMessage => {
                const damage = rollMessage.rolls[0].total;
                if (game.user.isGM) {
                  token.document.actor.applyDamage(damage, foundResult.damageType);
                } else {
                  game.socket.emit("system.reclaim-the-realm", { action: "applyDamage", actorId: token.document.actor.id, tokenId: token.document.id, damage: damage, type: foundResult.damageType });
                }
              });
              break;
            case 'heal':
              parentActor.roll(foundResult.healFormula, {type: game.i18n.localize(CONFIG.RTR.abilityResultType[foundResult.type])})
                .then(healResult => {
                  if (game.user.isGM) {
                    token.document.actor.heal(healResult.rolls[0].total, foundResult.healTHP);
                  } else {
                    game.socket.emit("system.reclaim-the-realm", { action: "heal", actorId: token.document.actor.id, tokenId: token.document.id, heal: healResult.rolls[0].total, healTHP: foundResult.healTHP });
                  }
              });
              break;
            case 'statusEffect':
              if (game.user.isGM) {
                token.document.actor.applyStatusEffect(foundResult.statusEffectToApply, foundResult.statusEffectDuration);
              } else {
                game.socket.emit("system.reclaim-the-realm", { action: "applyStatusEffect", actorId: token.document.actor.id, tokenId: token.document.id, statusEffect: foundResult.statusEffectToApply, duration: foundResult.statusEffectDuration });
              }
              this._renderStatusEffectAppliedChatMessage(foundResult.statusEffectToApply, parentActor, token);
              break;
            case 'damageAndStatusEffect':
              this._makeDamageRoll(foundResult, parentActor).then(rollMessage => {
                const damage = rollMessage.rolls[0].total;
                if (game.user.isGM) {
                  token.document.actor.applyDamage(damage, foundResult.damageType);
                  token.document.actor.applyStatusEffect(foundResult.statusEffectToApply, foundResult.statusEffectDuration);
                } else {
                  game.socket.emit("system.reclaim-the-realm", { action: "applyDamage", actorId: token.document.actor.id, damage: damage, type: foundResult.damageType });
                  game.socket.emit("system.reclaim-the-realm", { action: "applyStatusEffect", actorId: token.document.actor.id, tokenId: token.document.id, statusEffect: foundResult.statusEffectToApply, duration: foundResult.statusEffectDuration });
                }
              });
              this._renderStatusEffectAppliedChatMessage(chosenResult.statusEffectToApply, parentActor);
              break;
            case 'healAndStatusEffect':
              parentActor.roll(foundResult.healFormula, {type: game.i18n.localize(CONFIG.RTR.abilityResultType[foundResult.type])})
                .then(healResult => {
                  if (game.user.isGM) {
                    token.document.actor.heal(healResult.rolls[0].total, foundResult.healTHP);
                    token.document.actor.applyStatusEffect(foundResult.statusEffectToApply, foundResult.statusEffectDuration);
                  } else {
                    game.socket.emit("system.reclaim-the-realm", { action: "heal", actorId: token.document.actor.id, tokenId: token.document.id, heal: healResult.rolls[0].total, healTHP: foundResult.healTHP });
                    game.socket.emit("system.reclaim-the-realm", { action: "applyStatusEffect", actorId: token.document.actor.id, tokenId: token.document.id, statusEffect: foundResult.statusEffectToApply, duration: foundResult.statusEffectDuration });
                  }
              });
              break;
            default:
              console.error(`Chosen Result Type '${foundResult.type}' handling not defined`)
          }
        }))
      });
    }
  }

  /**
   * create radio option out of ability result
   * @param {Object} result 
   */
  _createAbilityResultRadioOption(result) {
    const condition = game.i18n.localize(CONFIG.RTR.abilityResultCondition[result.condition]);
    const type = game.i18n.localize(CONFIG.RTR.abilityResultType[result.type]);
    const statusEffect = game.i18n.localize(CONFIG.RTR.statusEffects[result.statusEffectToApply]?.name);
    const durationType = game.i18n.localize(CONFIG.RTR.abilityDurationTypes[result.statusEffectDurationType]);
    let resultTypeSpecificText;
    switch(result.type) {
      case 'damage':
        if (result.damageCalculationMethod === 'custom') {
          resultTypeSpecificText = `${result.damageFormula}${result.halfDamage ? ' (half)' : ''}`;
        } else {
          const damageCalcMethod = game.i18n.localize(CONFIG.RTR.abilityDamageCalculationMethod[result.damageCalculationMethod]);
          resultTypeSpecificText = `${damageCalcMethod}${result.halfDamage ? ' (half)' : ''}`;
        }
        break;
      case 'statusEffect':
        resultTypeSpecificText = `${statusEffect} ${result.statusEffectDuration} ${durationType}`;
        break;
      case 'damageAndStatusEffect':
        if (result.damageCalculationMethod === 'custom') {
          resultTypeSpecificText = `${result.damageFormula}${result.halfDamage ? ' (half)' : ''}`;
        } else {
          const damageCalcMethod = game.i18n.localize(CONFIG.RTR.abilityDamageCalculationMethod[result.damageCalculationMethod]);
          resultTypeSpecificText = `${damageCalcMethod}${result.halfDamage ? ' (half)' : ''}`;
        }
        resultTypeSpecificText += ` ${statusEffect} ${result.statusEffectDuration} ${durationType}`;
        break;
      case 'heal':
        resultTypeSpecificText = `${result.healFormula}`;
        break;
    }
    resultTypeSpecificText += result.additionalEffects;
    return `
    <div>
      <input type="radio" id="${result.condition}" name="condition" value="${result.condition}" checked />
      <label for="${result.condition}"><strong>${condition}:</strong> ${type} ${resultTypeSpecificText}</label>
    </div>`;
  }

  /**
   * @param {Object} abilityActionResult 
   * @param {RtRActor} parentActor owner of the item
   * @returns {Promise<Object>} the roll message 
   * @private
   */
  _makeDamageRoll(abilityActionResult, parentActor) {
    const rollText = abilityActionResult.damageCalculationMethod === 'custom' ? 'DAMAGE' : game.i18n.localize(CONFIG.RTR.abilityDamageCalculationMethod[abilityActionResult.damageCalculationMethod]);
    return parentActor.damageRoll(abilityActionResult.damageCalculationMethod, abilityActionResult.halfDamage, {type: rollText}, abilityActionResult.damageFormula, abilityActionResult.damageType);
  }

  /**
   * Render a status effect being applied
   * @param {String} statusEffectId
   * @param {RtRActor} actingActor actor which used the orignal ability
   * @param {Token} target the target which the status effect is applied to, if undefined, there is no target
   */
  _renderStatusEffectAppliedChatMessage(statusEffectId, actingActor, target) {
    const statusEffect = CONFIG.RTR.statusEffects[statusEffectId];
    if (!statusEffect) {
      ui.notifications.error(`Status Effect '${statusEffectId}' not found`, {console: true});
      return;
    }
    let targetMessage = '';
    if (target) {
      targetMessage = ` to ${target.name}`;
    }
    const statusEffectName = game.i18n.localize(statusEffect.name);
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: actingActor }),
        content: `
          <span>${actingActor.name} applies <img style='display: inline; filter: brightness(0);' src="${statusEffect.img}" title="${statusEffectName}" height="16" width="16"/> ${statusEffectName}${targetMessage}.</span>
        `,
        style: CONST.CHAT_MESSAGE_STYLES.OOC
    });
  }
}
