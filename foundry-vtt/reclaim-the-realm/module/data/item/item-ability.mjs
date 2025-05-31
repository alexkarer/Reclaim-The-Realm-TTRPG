import RtRItemBase from './base-item.mjs';

export default class RtRAbility extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Ability',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    return schema;
  }
}
