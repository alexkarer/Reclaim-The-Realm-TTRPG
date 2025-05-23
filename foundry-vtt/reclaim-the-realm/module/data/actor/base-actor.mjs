export default class RtRActorBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ["RTR.Actor.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.hp = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 1 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 }),
    });
    schema.tempHp = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.biography = new fields.HTMLField();

    schema.levels = new fields.SchemaField({
      level: new fields.NumberField({ required: true, nullable: false, integer: false, initial: 1, min: 0.125 }),
      martialLevel: new fields.NumberField({ required: true, nullable: false, integer: false, initial: 0, min: 0 }),
      spellLevel: new fields.NumberField({ required: true, nullable: false, integer: false, initial: 0, min: 0 }),
    });

    schema.attributes = new fields.SchemaField(
      Object.keys(CONFIG.RTR.attributes).reduce((obj, attr) => {
        obj[attr] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: -8,
          }),
        });
        return obj;
      }, {})
    );

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.attributes) {
      // Handle ability label localization.
      this.attributes[key].label = game.i18n.localize(CONFIG.RTR.attributes[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    if (this.attributes) {
      for (let [k, v] of Object.entries(this.attributes)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.level = this.levels.level;

    return data;
  }
}
