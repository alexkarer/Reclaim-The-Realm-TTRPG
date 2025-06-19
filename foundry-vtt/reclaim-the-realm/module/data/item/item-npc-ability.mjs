import RtRAbility from './item-ability.mjs';

export default class RtRNpcAbility extends RtRAbility {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.NpcAbility',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.summary = new fields.StringField();

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
