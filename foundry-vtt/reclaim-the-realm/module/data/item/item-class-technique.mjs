import RtRAbility from './item-ability.mjs';

export default class RtRClassTechnique extends RtRAbility {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.ClassTechnique',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();
    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
