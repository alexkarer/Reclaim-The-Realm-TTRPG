import { RtRActor } from "./actor";

export class RtRToken extends TokenDocument {

  /**
   * Handle everything that happens on the start of combat
   */
  async handleOnCombatTurnStart() {
    if (!this || !this.actor) {
      console.error("Unexpected undefined/null");
      return;
    }

    const actor = this.actor as RtRActor;
    if (actor._hasStatusEffect('BURNING I')) {
      actor.roll('d6[fire]', { type: 'BURNING I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        actor.applyDamage(damage, 'fire');
      });
    }
    if (actor._hasStatusEffect('BLEEDING I')) {
      actor.roll('d6[bleed]', { type: 'BLEEDING I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        actor.applyDamage(damage, 'bleed');
      });
    }
    if (actor._hasStatusEffect('POISON I')) {
      actor.roll('d6[poison]', { type: 'POISON I' }).then(rollMessage => {
        let damage = this._parseRollResult(rollMessage);
        actor.applyDamage(damage, 'poison');
      });
    }
    if (actor._hasStatusEffect('HEALING I')) {
      actor.roll('d6[heal]', { type: 'HEALING I' }).then(rollMessage => {
        let heal = this._parseRollResult(rollMessage);
        actor.heal(heal, false);
      });
    }
  }


  _parseRollResult(rollMessage: Roll.ToMessageReturn<undefined>): number {
    return rollMessage.rolls[0].total;
  }

}