import RtRActorBase from './base-actor.mjs';
import { calculateXPMilestonesAndLevel, getStrCarryLiftValues, getMartialDamage } from '../../helpers/actor-helper.mjs';

export default class RtRCharacter extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.Character',
  ];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.stamina = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });

    schema.arcana = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });

    schema.xp = new fields.SchemaField({
      total: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      prevMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      nextMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.attributePoints = new fields.SchemaField({
      totalAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      usedAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      additionalAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.skillPoints = new fields.SchemaField({
        skillPointsPerLevel: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
        additionalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        totalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        usedSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.inventory = new fields.SchemaField({
      bc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      sc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      gc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      carryCapacityKg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      liftPushDragKg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.knownAbilities = new fields.SchemaField({
      knownClassTechniques: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      knownMartialManeuvers: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      knownMartialManeuversTypes: new fields.StringField(),
      knownSpells: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      knownSpellDisciplines: new fields.StringField()
    });

    schema.perks = new fields.SchemaField({
      additionalPerkPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      totalPerkPoints: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2 }),
    });

    schema.martialDamage = new fields.SchemaField({
      light: new fields.StringField(),
      medium: new fields.StringField(),
      heavy: new fields.StringField(),
      attr: new fields.StringField({initial: 'str'}),
      penalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.classResource = new fields.StringField();

    return schema;
  }

  /** @override */
  prepareBaseData() {
    // calcualte level first before doing anything else
    this._calculateLevelAndXp();

    super.prepareBaseData();

    this.hp.max = (this.data.hpPerLevel + Math.floor(this.attributes.con.value / 2)) * this.levels.level + this.data.additionalHp;
    this.stamina.max = Math.max(this.attributes.con.value + Math.floor(this.levels.level + this.levels.martialLevel), 1);
    this.arcana.max = Math.floor(3 * this.levels.spellProficency * this.levels.level);
    this._calculateSkillPoints();
    this._calculateAttributePoints();
    this._caclulateKnownAbilitiesAndPerks();
  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    this._calculateMartialDamage();
    this._calculateInventoryValues();
  }

  /** @override */
  getRollData() {
    const data = super.getRollData();
    data.spellCastBonus = this.levels.spellLevel;
    data.lightMartialDamage = this.martialDamage.light;
    data.mediumMartialDamage = this.martialDamage.medium;
    data.heavyMartialDamage = this.martialDamage.heavy;
    return data;
  }

  _calculateLevelAndXp() {
    const progression = calculateXPMilestonesAndLevel(this.xp.total);
    this.levels.level = progression.level;
    this.xp.prevMilestone = progression.xpPrevMilestone;
    this.xp.nextMilestone = progression.xpNextMilestone;
  }

  _calculateSkillPoints() {
    this.skillPoints.totalSkillPoints = (this.skillPoints.skillPointsPerLevel + Math.floor(this.attributes.int.value / 2)) * this.levels.level + this.skillPoints.additionalSkillPoints;
    this.skillPoints.usedSkillPoints = 0;
    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        this.skillPoints.usedSkillPoints += (v.rank + (v.classSkill ? -2 : 0));
      }
    }
  }

  _calculateAttributePoints() {
    this.attributePoints.totalAttributePoints = (2 * (this.levels.level - 1)) + 8 + 14 + this.attributePoints.additionalAttributePoints; 
    this.attributePoints.usedAttributePoints = 0;
    if (this.attributes) {
      for (let [k, v] of Object.entries(this.attributes)) {
        this.attributePoints.usedAttributePoints += ((v.value + (v.classAttribute ? -2 : 0)) + 2);
      }
    }
  }

  _calculateInventoryValues() {
    let ccAndLpd = getStrCarryLiftValues(this.attributes.str.value);
    if (!ccAndLpd) {
      console.error("Unable to calculate Carrying Capacity Lift/Push/Drag for STR: ", this.attributes.str.value);
      return;
    }

    this.inventory.carryCapacityKg = ccAndLpd.cc;
    this.inventory.liftPushDragKg = ccAndLpd.lpd;
  }

  _caclulateKnownAbilitiesAndPerks() {
    this.knownAbilities.knownClassTechniques = 2 + Math.floor(this.levels.level / 2) + Math.floor(this.attributes.int.value / 2);

    if (this.levels.martialProficency === 0) {
      this.knownAbilities.knownMartialManeuvers = 0;
    } else {
      this.knownAbilities.knownMartialManeuvers = 2 + Math.floor(this.levels.martialLevel / 2) + Math.floor(this.attributes.int.value / 2);
    }

    if (this.levels.spellProficency === 0) {
      this.knownAbilities.knownSpells = 0;
    } else {
      this.knownAbilities.knownSpells = 2 + Math.floor(this.levels.spellLevel / 2) + Math.floor(this.attributes.int.value / 2);
    }

    this.perks.totalPerkPoints = this.levels.level * 2 + this.perks.additionalPerkPoints;
  }

  _calculateMartialDamage() {
    let attribute = Object.entries(this.attributes).find(([k, v]) => k === this.martialDamage.attr);
    let attrValue = 0;
    if (!attribute) {
      console.error("Unable to find attribute", this.martialDamage.attr);
    } else {
      attrValue = attribute[1].value - this.martialDamage.penalty;
    }

    let md = getMartialDamage(attrValue);
    if (!md) {
      console.error("Unable to calculate Martial Damage for STR: ", this.attributes.str.value);
      return;
    }
    this.martialDamage.light = md.light;
    this.martialDamage.medium = md.medium;
    this.martialDamage.heavy = md.heavy;
  }
}
