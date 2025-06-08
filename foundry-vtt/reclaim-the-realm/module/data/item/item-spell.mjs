import RtRAbility from './item-ability.mjs';

export default class RtRSpell extends RtRAbility {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Ability',
    'RTR.Item.Spell',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.spellDifficulty = new fields.NumberField({ ...requiredInteger, initial: 6, min: 0 });
    schema.components = new fields.StringField();

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
    super.prepareDerivedData();
    // Build the formula dynamically using string interpolation
    const roll = this.roll;

    this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`;
  }
}
