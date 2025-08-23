import { calculateXPReward } from "../../helpers/actor-helper";
import RtRActorBase, { RtRActorBaseSchema } from "./base-actor";

export interface RtRNPCSchema extends RtRActorBaseSchema {
  immunitiesString: foundry.data.fields.StringField;
  statusEffectImmunityString: foundry.data.fields.StringField;
  xpReward: foundry.data.fields.NumberField;
}

export default class RtRNPC extends RtRActorBase<RtRNPCSchema> {
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
      statusEffectImmunityString: new fields.StringField(),
      xpReward: new fields.NumberField()
    };
  }

  /** @override */
  prepareBaseData() {
    super.prepareBaseData();
    this.xpReward = calculateXPReward(this.levels.level?.valueOf() ?? 0);
  }

  /** @override */
  getRollData() {
    const data = super.getRollData();
    return data;
  }

}
