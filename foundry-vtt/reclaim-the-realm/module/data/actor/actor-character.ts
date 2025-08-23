import { calculateXPMilestonesAndLevel, getMartialDamage, getStrCarryLiftValues } from '../../helpers/actor-helper';
import RtRActorBase, { RtRActorBaseSchema, RtRActorResourceSchema } from './base-actor';

export interface RtRCharacterSchema extends RtRActorBaseSchema {
  stamina: foundry.data.fields.SchemaField<RtRActorResourceSchema>;
  arcana: foundry.data.fields.SchemaField<RtRActorResourceSchema>;
  xp: foundry.data.fields.SchemaField<RtRCharacterXPSchema>;
  attributePoints: foundry.data.fields.SchemaField<RtRCharacterAttributePointsSchema>;
  skillPoints: foundry.data.fields.SchemaField<RtRCharacterSkillPointsSchema>;
  inventory: foundry.data.fields.SchemaField<RtRCharacterInventorySchema>;
  knownAbilities: foundry.data.fields.SchemaField<RtRCharacterKnownAbilitiesSchema>;
  perks: foundry.data.fields.SchemaField<RtRCharacterPerksSchema>;
  martialDamage: foundry.data.fields.SchemaField<RtRCharacterMartialDamageSchema>;
  classResource: foundry.data.fields.StringField;
}

export interface RtRCharacterXPSchema extends RtRActorBaseSchema {
  total: foundry.data.fields.NumberField;
  prevMilestone: foundry.data.fields.NumberField;
  nextMilestone: foundry.data.fields.NumberField;
}

export interface RtRCharacterAttributePointsSchema extends RtRActorBaseSchema {
  totalAttributePoints: foundry.data.fields.NumberField;
  usedAttributePoints: foundry.data.fields.NumberField;
  additionalAttributePoints: foundry.data.fields.NumberField;
}

export interface RtRCharacterSkillPointsSchema extends RtRActorBaseSchema {
  skillPointsPerLevel: foundry.data.fields.NumberField;
  additionalSkillPoints: foundry.data.fields.NumberField;
  totalSkillPoints: foundry.data.fields.NumberField;
  usedSkillPoints: foundry.data.fields.NumberField;
}

export interface RtRCharacterInventorySchema extends RtRActorBaseSchema {
  bc: foundry.data.fields.NumberField;
  sc: foundry.data.fields.NumberField;
  gc: foundry.data.fields.NumberField;
  carryCapacityKg: foundry.data.fields.NumberField;
  liftPushDragKg: foundry.data.fields.NumberField;
}

export interface RtRCharacterKnownAbilitiesSchema extends RtRActorBaseSchema {
  knownClassTechniques: foundry.data.fields.NumberField;
  knownMartialManeuvers: foundry.data.fields.NumberField;
  knownMartialManeuversTypes: foundry.data.fields.StringField;
  knownSpells: foundry.data.fields.NumberField;
  knownSpellDisciplines: foundry.data.fields.StringField;
}

export interface RtRCharacterPerksSchema extends RtRActorBaseSchema {
  additionalPerkPoints: foundry.data.fields.NumberField;
  totalPerkPoints: foundry.data.fields.NumberField;
}

export interface RtRCharacterMartialDamageSchema extends RtRActorBaseSchema {
  light: foundry.data.fields.StringField;
  medium: foundry.data.fields.StringField;
  heavy: foundry.data.fields.StringField;
  attr: foundry.data.fields.StringField;
  penalty: foundry.data.fields.NumberField;
}

export default class RtRCharacter extends RtRActorBase<RtRCharacterSchema> {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.Character',
  ];

  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    return {
      ...super.defineSchema(),
      stamina: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        max: new fields.NumberField({ ...requiredInteger, initial: 0 })
      }),
      arcana: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        max: new fields.NumberField({ ...requiredInteger, initial: 0 })
      }),
      xp: new fields.SchemaField({
        total: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        prevMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        nextMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      attributePoints: new fields.SchemaField({
        totalAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        usedAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        additionalAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      skillPoints: new fields.SchemaField({
        skillPointsPerLevel: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
        additionalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        totalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        usedSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      inventory: new fields.SchemaField({
        bc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        sc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        gc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        carryCapacityKg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        liftPushDragKg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      knownAbilities: new fields.SchemaField({
        knownClassTechniques: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        knownMartialManeuvers: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        knownMartialManeuversTypes: new fields.StringField(),
        knownSpells: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        knownSpellDisciplines: new fields.StringField()
      }),
      perks: new fields.SchemaField({
        additionalPerkPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        totalPerkPoints: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2 }),
      }),
      martialDamage: new fields.SchemaField({
        light: new fields.StringField(),
        medium: new fields.StringField(),
        heavy: new fields.StringField(),
        attr: new fields.StringField({ initial: 'str' }),
        penalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),
      classResource: new fields.StringField()
    };
  }

  /** @override */
  prepareBaseData() {
    // calcualte level first before doing anything else
    this._calculateLevelAndXp();

    super.prepareBaseData();

    this.hp.max = ((this.data.hpPerLevel?.valueOf() ?? 0) + Math.floor(this.attributes.con.value / 2)) * (this.levels.level?.valueOf() ?? 0) + (this.data.additionalHp?.valueOf() ?? 0);
    this.stamina.max = Math.max(this.attributes.con.value + Math.floor((this.levels.level?.valueOf() ?? 0) + (this.levels.martialLevel?.valueOf() ?? 0)), 1);
    this.arcana.max = Math.floor(3 * this.levels.spellProficency * (this.levels.level?.valueOf() ?? 0));
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
    return {
      ...super.getRollData(),
      spellCastBonus: this.levels.spellLevel,
      lightMartialDamage: this.martialDamage.light,
      mediumMartialDamage: this.martialDamage.medium,
      heavyMartialDamage: this.martialDamage.heavy
    };
  }

  _calculateLevelAndXp() {
    const progression = calculateXPMilestonesAndLevel(this.xp.total?.valueOf() ?? 0);
    this.levels.level = progression.level;
    this.xp.prevMilestone = progression.xpPrevMilestone;
    this.xp.nextMilestone = progression.xpNextMilestone;
  }

  _calculateSkillPoints() {
    this.skillPoints.totalSkillPoints = ((this.skillPoints.skillPointsPerLevel?.valueOf() ?? 0) + Math.floor(this.attributes.int.value / 2)) * (this.levels.level?.valueOf() ?? 0) + (this.skillPoints.additionalSkillPoints?.valueOf() ?? 0);
    this.skillPoints.usedSkillPoints = 0;
    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        this.skillPoints.usedSkillPoints += (v.rank + (v.classSkill ? -2 : 0));
      }
    }
  }

  _calculateAttributePoints() {
    this.attributePoints.totalAttributePoints = (2 * ((this.levels.level ?.valueOf() ?? 0) - 1)) + 8 + 14 + (this.attributePoints.additionalAttributePoints?.valueOf() ?? 0);
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
    this.knownAbilities.knownClassTechniques = 2 + Math.floor((this.levels.level?.valueOf() ?? 0) / 2) + Math.floor(this.attributes.int.value / 2);

    if (this.levels.martialProficency === 0) {
      this.knownAbilities.knownMartialManeuvers = 0;
    } else {
      this.knownAbilities.knownMartialManeuvers = 2 + Math.floor((this.levels.level?.valueOf() ?? 0) / 2) + Math.floor(this.attributes.int.value / 2);
    }

    if (this.levels.spellProficency === 0) {
      this.knownAbilities.knownSpells = 0;
    } else {
      this.knownAbilities.knownSpells = 2 + Math.floor((this.levels.spellLevel?.valueOf() ?? 0) / 2) + Math.floor(this.attributes.int.value / 2);
    }

    this.perks.totalPerkPoints = (this.levels.level?.valueOf() ?? 0) * 2 + (this.perks.additionalPerkPoints?.valueOf() ?? 0);
  }

  _calculateMartialDamage() {
    let attribute = Object.entries(this.attributes).find(([k, v]) => k === this.martialDamage.attr);
    let attrValue = 0;
    if (!attribute) {
      console.error("Unable to find attribute", this.martialDamage.attr);
    } else {
      attrValue = attribute[1].value - (this.martialDamage.penalty?.valueOf() ?? 0);
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
