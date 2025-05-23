import RtRActorBase from './base-actor.mjs';

export default class RtRNPC extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.NPC',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.xpReward = this.levels.level * 100;
  }

  getRollData() {
    const data = super.getRollData();
    return data;
  }

}
