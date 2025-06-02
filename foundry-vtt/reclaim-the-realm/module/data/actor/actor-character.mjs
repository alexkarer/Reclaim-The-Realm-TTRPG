import RtRActorBase from './base-actor.mjs';
import { calculateXPMilestonesAndLevel } from '../../helpers/character-helper.mjs';

export default class RtRCharacter extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.class = new fields.StringField();

    schema.exhaustion = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

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
      usedAttributePoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.skillPoints = new fields.SchemaField({
        skillPointsPerLevel: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
        additionalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        totalSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        usedSkillPoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.hp.max = (this.data.hpPerLevel + Math.floor(this.attributes.con.value / 2)) * this.levels.level + this.data.additionalHp;
    this.stamina.max = Math.max(this.attributes.con.value + Math.floor(this.levels.level + this.levels.martialLevel), 1);
    this.arcana.max = Math.floor(3 * this.levels.spellLevel);
    this._calculateLevelAndXp();
    this._calculateSkillPoints();
    this._calculateAttributePoints();
  }

  getRollData() {
    const data = super.getRollData();
    data.exh = this.exhaustion;
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
    this.attributePoints.totalAttributePoints = 2 * (this.levels.level - 1) + 10;
    this.attributePoints.usedAttributePoints = 0;
    if (this.attributes) {
      for (let [k, v] of Object.entries(this.attributes)) {
        this.attributePoints.usedAttributePoints += (v.value + (v.classAttribute ? -2 : 0));
      }
    }
  }
}
