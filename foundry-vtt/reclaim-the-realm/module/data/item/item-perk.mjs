import RtRItemBase from './base-item.mjs';

export default class RtRPerk extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Perk',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.tags = new fields.StringField();
    schema.requirements = new fields.StringField();

    return schema;
  }
}
