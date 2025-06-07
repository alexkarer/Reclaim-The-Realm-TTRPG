import RtRItemBase from './base-item.mjs';

export default class RtRSpell extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Spell',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.spellLevel = new fields.NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 1,
      min: 1,
      max: 9,
    });

    // Copied from Equipment 
    schema.roll = new fields.SchemaField({
      diceNum: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 1,
      }),
      diceSize: new fields.StringField({ initial: 'd20' }),
      diceBonus: new fields.StringField({
        initial: '+@str+ceil(@lvl / 2)',
      }),
    });

    schema.formula = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const roll = this.roll;

    this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`;
  }
}
