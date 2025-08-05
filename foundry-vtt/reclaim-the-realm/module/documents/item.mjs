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

    if (this.system.actions.length > 0) {
      switch (this.system.actions[0].actionType) {
        case 'meleeMartialAttack':
        case 'meleeSpellAttack':
        case 'rangedMartialAttack':
        case 'rangedSpellAttack':
          await this._handleAttackAction(parentActor, this.system.actions[0]);
          break;
        case 'martialTest':
          break;
        case 'spellTest':
          break;
        default:
          console.warn(`Unknown action type: ${this.system.actions[0].actionType}`);
          break;
      }
    } else {
      ChatMessage.create({
          speaker: ChatMessage.getSpeaker({ actor: parentActor }),
          content: `${parentActor.name} is using the ability ${this.name}.`,
          style: CONST.CHAT_MESSAGE_STYLES.OOC
      });
    }
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
      // TODO new interactive chat message that allows to apply damage, status effects, etc.
      console.log("Attack Result:", attackResult);
    } else {
      // TODO handle roll natural 1 or 20
      const targetHits = targets.map(target => {
        const hitResult = target.document.baseActor.determineAttackHit(attackResult.rolls[0].total);
        return [target, hitResult];
      });

      console.log(targetHits);
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
}
