import RtRActorBase from './base-actor.mjs';
import { calculateXPReward } from '../../helpers/character-helper.mjs';

export default class RtRNPC extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.NPC',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.npcLevel = new fields.NumberField({ required: true, nullable: false, initial: 1, min: 0.125 });

    // use it this way for now, but should eventually migrate
    schema.immunitiesString = new fields.StringField();
    schema.statusEffectImmunityString = new fields.StringField();

    return schema;
  }

  prepareDerivedData() {
    this.levels.level = this.npcLevel;
    super.prepareDerivedData();
    this.xpReward = calculateXPReward(this.levels.level);
  }

  getRollData() {
    const data = super.getRollData();
    return data;
  }

}
