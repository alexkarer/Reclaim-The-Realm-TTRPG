import RtRItemBase from './base-item.mjs';

export default class RtRNpcTrait extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.NpcTrait',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.summary = new fields.StringField();

    return schema;
  }
}
