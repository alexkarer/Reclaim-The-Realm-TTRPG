import RtRDataModel from "../base-model.mjs";

export default class RtRActorBase extends RtRDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.hp = new fields.SchemaField({
      min: new fields.NumberField({ ...requiredInteger, min: 1, initial: 0 }),
      value: new fields.NumberField({ ...requiredInteger, min: 1, initial: 10 }),
      max: new fields.NumberField({ ...requiredInteger, min: 1, initial: 10 })
    });
    schema.tempHp = new fields.SchemaField({
      min: new fields.NumberField({ ...requiredInteger, min: 0, initial: 0 }),
      value: new fields.NumberField({ ...requiredInteger, min: 0, initial: 0 }),
      max: new fields.NumberField({ ...requiredInteger, min: 0, initial: 0 })
    })
    schema.alignment = new fields.StringField({
      required: true,
      blank: false,
      options: ["-", "unaligned", "lawful good", "lawful neutral", "lawful evil", "neutral good", "true neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil"],
      initial: "-"
    });
    schema.ap = new fields.NumberField({ ...requiredInteger, min: 1, initial: 3, max: 8 });
    schema.mp = new fields.NumberField({ ...requiredInteger, min: 1, initial: 6, max: 20 });

    // Iterate over attribute names and create a new SchemaField for each.
    schema.attributes = new fields.SchemaField(Object.keys(CONFIG.RTR.attributes).reduce((obj, attr) => {
      obj[attr] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, min: -6, initial: 0, max: 20 }),
      });
      return obj;
    }, {}));
    schema.proficencies = new fields.SchemaField({
      stability: new fields.NumberField({ required: true, nullable: false, integer: false }),
      dodge: new fields.NumberField({ ...requiredInteger, min: -6, initial: 0, max: 40 }),
      toughness: new fields.NumberField({ ...requiredInteger, min: -6, initial: 0, max: 40 }),
      willpower: new fields.NumberField({ ...requiredInteger, min: -6, initial: 0, max: 40 }),
    });

    return schema;
  }

  prepareDerivedData() {
    for (const key in this.attributes) {
      // Handle ability label localization.
      this.attributes[key].label = game.i18n.localize(CONFIG.RTR.attributes[key]) ?? key;
    }
  }
}