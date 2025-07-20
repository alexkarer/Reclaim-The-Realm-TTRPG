import RtRActorBase from './base-actor.mjs';
import { calculateXPReward } from '../../helpers/actor-helper.mjs';

export default class RtRNPC extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.NPC',
  ];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // use it this way for now, but should eventually migrate
    schema.immunitiesString = new fields.StringField();
    schema.statusEffectImmunityString = new fields.StringField();

    return schema;
  }

  /** @override */
  prepareBaseData() {
    super.prepareBaseData();
    this.xpReward = calculateXPReward(this.levels.level);
  }

  /** @override */
  getRollData() {
    const data = super.getRollData();
    return data;
  }

}
