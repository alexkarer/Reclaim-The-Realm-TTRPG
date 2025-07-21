import { getApForLevel } from '../../helpers/actor-helper.mjs';

export default class RtRActorBase extends foundry.abstract.TypeDataModel {
  static LOCALIZATION_PREFIXES = ["RTR.Actor.base"];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const proficiency = { choices: [0, 0.17, 0.34, 0.67, 1] };
    const requiredStringField = { required: true, nullable: false, blank: false };
    const schema = {};

    schema.hp = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10, min: 1 }),
    });
    schema.tempHp = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.exhaustion = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.ap = new fields.NumberField({ ...requiredInteger, initial: 3 });
    schema.mp = new fields.NumberField({ ...requiredInteger, initial: 6 });

    schema.biography = new fields.HTMLField();
    schema.alignment = new fields.StringField({blank: false, initial: 'lawful good', choices: ['unaligned', 'lawful good', 'lawful neutral', 'lawful evil', 'neutral good', 'true neutral', 'neutral evil', 'chaotic good', 'chaotic neutral', 'chaotic evil']});

    schema.editLock = new fields.BooleanField({ initial: true, required: true, nullable: false });

    schema.data = new fields.SchemaField({
      hpPerLevel: new fields.NumberField({ ...requiredInteger, initial: 6, min: 1 }),
      additionalHp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      stabilityBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      dodgeBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      toughnessBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      willpowerBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      movementBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      manoeuvrePenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      movementPenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    schema.levels = new fields.SchemaField({
      level: new fields.NumberField({ required: true, nullable: false, integer: false, initial: 1, min: 0.125 }),
      martialLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      spellLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      martialProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
      spellProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
    });

    schema.attributes = new fields.SchemaField(
      Object.keys(CONFIG.RTR.attributes).reduce((obj, attr) => {
        obj[attr] = new fields.SchemaField({
          value: new fields.NumberField({...requiredInteger, initial: -2, min: -8 }),
          classAttribute: new fields.BooleanField({ initial: false, required: true, nullable: false }),
          attributeMaximum: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3 })
        });
        return obj;
      }, {})
    );

    schema.defenses = new fields.SchemaField({
      stabilityProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
      dodgeProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
      toughnessProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
      willpowerProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),

      shieldBlockBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      shieldBlockThreshold: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    
      stability: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      dodge: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      toughness: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      willpower: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      shieldBlock: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    schema.resistances = new fields.ArrayField(
      new fields.SchemaField({
        damageType: new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.damageTypes)}),
        value: new fields.NumberField({ ...requiredInteger, min: 1}), 
      })
    );
    schema.newResistanceDamageType = new fields.StringField({...requiredStringField, initial: Object.keys(CONFIG.RTR.damageTypes)[0], choices: Object.keys(CONFIG.RTR.damageTypes)});
    schema.newResistanceValue = new fields.NumberField({...requiredInteger, initial: 0});

    schema.attackBonuses = new fields.SchemaField({
      meleeMartialAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      rangedMartialAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      meleeSpellAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      rangedSpellAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    });

    schema.skills = new fields.SchemaField(
      Object.keys(CONFIG.RTR.skills).reduce((obj, skill) => {
        obj[skill] = new fields.SchemaField({
          rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
          classSkill: new fields.BooleanField({ initial: false, required: true, nullable: false }),
          rankMaximum: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
          attrBonus: new fields.StringField({...requiredStringField, initial: 'str', choices: Object.keys(CONFIG.RTR.attributes)})
        });
        return obj;
      }, {})
    );

    return schema;
  }

  /** @override */
  prepareBaseData() {
    super.prepareBaseData();

    for (const key in this.skills) {
      this.skills[key].rankMaximum = this.levels.level + (this.skills[key].classSkill ? 2 : 0);
    }

    for (const key in this.attributes) {
      this.attributes[key].attributeMaximum = 3 + (this.attributes[key].classAttribute ? 2 : 0) + Math.floor((this.levels.level - 1) * 0.5);
    }

    this.levels.martialLevel = Math.floor(this.levels.martialProficency * this.levels.level);
    this.levels.spellLevel = Math.floor(this.levels.spellProficency * this.levels.level);

    this.ap = getApForLevel(this.levels.level);
    this.mp = 6 + Math.floor(this.attributes.agi.value / 3) + this.data.movementBonus - this.data.movementPenalty;

    this.defenses.stability = Math.floor(this.defenses.stabilityProficency * this.levels.level) + this.attributes.str.value + this.data.stabilityBonus;
    this.defenses.dodge = Math.floor(this.defenses.dodgeProficency * this.levels.level) + this.attributes.agi.value + this.data.dodgeBonus - this.data.manoeuvrePenalty;
    this.defenses.toughness = Math.floor(this.defenses.toughnessProficency * this.levels.level) + this.attributes.con.value + this.data.toughnessBonus;
    this.defenses.willpower = Math.floor(this.defenses.willpowerProficency * this.levels.level) + this.attributes.spi.value + this.data.willpowerBonus;
    this.defenses.shieldBlock = this.levels.martialLevel + this.defenses.shieldBlockBase;

    this.attackBonuses.meleeMartialAttack = this.levels.martialLevel + this.attributes.agi.value;
    this.attackBonuses.rangedMartialAttack = this.levels.martialLevel + this.attributes.per.value;
    this.attackBonuses.meleeSpellAttack = this.levels.spellLevel + this.attributes.agi.value;
    this.attackBonuses.rangedSpellAttack = this.levels.spellLevel + this.attributes.per.value;
  }

  /** @override */
  getRollData() {
    const data = {};

    if (this.attributes) {
      for (let [k, v] of Object.entries(this.attributes)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.level = this.levels.level;

    data.d20Test = -this.exhaustion;

    data.martialTest = this.levels.martialLevel;
    data.spellTest = this.levels.spellLevel;

    data.stabilitySave = this.defenses.stability;
    data.dodgeSave = this.defenses.dodge;
    data.toughnessSave = this.defenses.toughness;
    data.willpowerSave = this.defenses.willpower;
    data.shieldBlock = this.defenses.shieldBlock;

    data.meleeMartialAttack = this.attackBonuses.meleeMartialAttack;
    data.rangedMartialAttack = this.attackBonuses.rangedMartialAttack;
    data.meleeSpellAttack = this.attackBonuses.meleeSpellAttack;
    data.rangedSpellAttack = this.attackBonuses.rangedSpellAttack;

    data.manoeuvrePenalty = this.data.manoeuvrePenalty;

    return data;
  }
}
