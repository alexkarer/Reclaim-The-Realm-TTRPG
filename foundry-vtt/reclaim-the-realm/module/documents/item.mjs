import { RtRActor } from "./actor.mjs";

const { api } = foundry.applications;

/**
 * Extend the basic Item with some very simple modifications.
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

    if (this.system.actions.length > 0) {
      switch (this.system.actions[0].actionType) {
        case 'meleeMartialAttack':
        case 'meleeSpellAttack':
        case 'rangedMartialAttack':
        case 'rangedSpellAttack':
          await this._handleAttackAction(parentActor, this.system.actions[0]);
          break;
        case 'martialTest':
          // TODO
          break;
        case 'spellTest':
          // TODO
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
          <img style='position: absolute; transform: translate(0, 5px);' src='${this.img}' title='${this.name}' width='24' height='24'/>
          <p style='margin-left: 29px; margin-top: 0px;'>${parentActor.name} is using ${this.name}.</p>
        `,
        style: CONST.CHAT_MESSAGE_STYLES.OOC
    });
  }

  /**
   * Handle attack actions for abilities.
   * @param {RtRActor} parentActor 
   * @param {Object} action 
   * @private
   */
  async _handleAttackAction(parentActor, action) {
    const targets = game.user.targets;
    let attackResult = await this._makeActorAttack(parentActor, action.actionType);
    if (!attackResult) {
      return;
    }
    if (targets.size === 0) {
      this._handleAttackResult(action.results,new Set(), parentActor);
    } else {
      const targetHitResults = targets.map(target => {
        const unmodifiedResult = attackResult?.rolls[0]?.terms[0]?.results[0]?.result;
        const hitResult = target.document.baseActor.determineAttackHit(attackResult.rolls[0].total, unmodifiedResult ?? 10);
        return [target, hitResult];
      });

      this._handleAttackResult(action.results, targetHitResults, parentActor);
    }
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
   * @param {Set<[Token, String]>} targetHitResults the targets that where hit
   * @param {RtRActor} parentActor that owns the item
   */
  async _handleAttackResult(actionResults, targetHitResults, parentActor) {
    if (actionResults.size === 0) {
      console.warn(`No Results defined for ability ${this.name}`);
    }

    // TODO is this different than any other result handling???

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

      if (chosenResult.type === 'damage') {
        const rollText = chosenResult.damageCalculationMethod === 'custom' ? 'DAMAGE' : game.i18n.localize(CONFIG.RTR.abilityDamageCalculationMethod[chosenResult.damageCalculationMethod]);
        parentActor.damageRoll(chosenResult.damageCalculationMethod, chosenResult.halfDamage, {type: rollText}, chosenResult.damageFormula, chosenResult.damageType);
      } else if (chosenResult.type === 'statusEffect') {
        // TODO what to do with status effect
      } else if (chosenResult.type === 'damageAndStatusEffect') {
        const rollText = chosenResult.damageCalculationMethod === 'custom' ? 'DAMAGE' : game.i18n.localize(CONFIG.RTR.abilityDamageCalculationMethod[chosenResult.damageCalculationMethod]);
        parentActor.damageRoll(chosenResult.damageCalculationMethod, chosenResult.halfDamage, {type: rollText}, chosenResult.damageFormula, chosenResult.damageType);
        // TODO what to do with status effect
      } else if (chosenResult.type === 'heal') {
        // TODO heal roll
      }

    } else {
      // TODO, do the same but apply directly to a target
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
    console.log(result);
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
}
