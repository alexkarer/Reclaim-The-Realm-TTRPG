export class RtRToken extends TokenDocument {

  /**
   * Handle everything that happens on the start of combat
   */
  async handleOnCombatTurnStart() {
    if (!this || !this.actor) {
      console.error("Unexpected undefined/null");
      return;
    }

    if (this.actor._hasStatusEffect('BURNING I')) {
      this.actor.roll('d6[fire]', { type: 'BURNING I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        this.actor.applyDamage(damage, 'fire');
      });
    }
    if (this.actor._hasStatusEffect('BLEEDING I')) {
      this.actor.roll('d6[bleed]', { type: 'BLEEDING I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        this.actor.applyDamage(damage, 'bleed');
      });
    }
    if (this.actor._hasStatusEffect('POISON I')) {
      this.actor.roll('d6[poison]', { type: 'POISON I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        this.actor.applyDamage(damage, 'poison');
      });
    }
    if (this.actor._hasStatusEffect('HEALING I')) {
      this.actor.roll('d6[heal]', { type: 'HEALING I' }).then(rollMessage => {
        let heal = this._parseRollResult(rollMessage);
        this.actor.heal(heal);
      });
    }
  }


  _parseRollResult(rollMessage: ChatMessage): number {
    return rollMessage.rolls[0].total;
  }

}