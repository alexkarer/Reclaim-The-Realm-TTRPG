export default class RtRActorBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ["RTR.Actor.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredFloatingNumber = { required: true, nullable: false, integer: false };
    const schema = {};

    schema.hp = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 1 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 }),
    });
    schema.tempHp = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.biography = new fields.HTMLField();
    schema.alignment = new fields.StringField({blank: false, initial: 'lawful good', choices: ['unaligned', 'lawful good', 'lawful neutral', 'lawful evil', 'neutral good', 'true neutral', 'neutral evil', 'chaotic good', 'chaotic neutral', 'chaotic evil']});

    schema.levels = new fields.SchemaField({
      level: new fields.NumberField({ ...requiredFloatingNumber, initial: 1, min: 0.125 }),
      martialLevel: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0 }),
      spellLevel: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0 }),
      martialProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
      spellProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
    });

    schema.attributes = new fields.SchemaField(
      Object.keys(CONFIG.RTR.attributes).reduce((obj, attr) => {
        obj[attr] = new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: -8,
        });
        return obj;
      }, {})
    );

    schema.defenses = new fields.SchemaField({
      stabilityProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
      dodgeProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
      toughnessProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
      willpowerProficency: new fields.NumberField({ ...requiredFloatingNumber, initial: 0, min: 0, max: 1 }),
      
      stability: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      dodge: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      toughness: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      willpower: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    });

    schema.attackBonuses = new fields.SchemaField({

    });

    schema.skills = new fields.SchemaField(
      Object.keys(CONFIG.RTR.skills).reduce((obj, skill) => {
        obj[skill] = new fields.SchemaField({
          rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
          classSkill: new fields.BooleanField({ initial: false, required: true, nullable: false }),
          rankMaximum: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
          attrBonus: new fields.StringField({blank: false, initial: 'str', choices: Object.keys(CONFIG.RTR.attributes)})
        });
        return obj;
      }, {})
    );

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    for (const key in this.skills) {
      this.skills[key].rankMaximum = this.levels.level + (this.skills[key].classSkill ? 2 : 0);
    }

    this.levels.martialLevel = Math.floor(this.levels.martialProficency * this.levels.level);
    this.levels.spellLevel = Math.floor(this.levels.spellProficency * this.levels.level);

    this.defenses.stability = Math.floor(this.defenses.stabilityProficency * this.levels.level) + this.attributes.str;
    this.defenses.dodge = Math.floor(this.defenses.dodgeProficency * this.levels.level) + this.attributes.agi;
    this.defenses.toughness = Math.floor(this.defenses.toughnessProficency * this.levels.level) + this.attributes.con;
    this.defenses.willpower = Math.floor(this.defenses.willpowerProficency * this.levels.level) + this.attributes.spi;
  }

  getRollData() {
    const data = {};

    if (this.attributes) {
      for (let [k, v] of Object.entries(this.attributes)) {
        data[k] = v;
      }
    }

    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.level = this.levels.level;

    data.stability = this.defenses.stability;
    data.dodge = this.defenses.dodge;
    data.toughness = this.defenses.toughness;
    data.willpower = this.defenses.willpower;

    return data;
  }
}
