import RtRAbility from './item-ability.mjs';

export default class RtRSpell extends RtRAbility {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.Spell',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.spellDifficulty = new fields.NumberField({ ...requiredInteger, initial: 6, min: 0 });
    schema.components = new fields.StringField();

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
