import RtRActorBase from "./base-actor";

export default class RtRNPC extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.NPC',
  ];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    return {
      ...super.defineSchema(),
      immunitiesString: new fields.StringField(),
      statusEffectImmunityString: new fields.StringField();
    };
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
