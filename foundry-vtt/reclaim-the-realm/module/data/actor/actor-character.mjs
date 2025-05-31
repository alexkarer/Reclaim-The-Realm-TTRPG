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

    schema.stamina = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    });

    schema.arcana = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    });

    schema.xp = new fields.SchemaField({
      total: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      prevMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      nextMilestone: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.hp.max = (this.data.hpPerLevel + Math.floor(this.attributes.con / 2)) * this.levels.level;
    this.stamina.max = Math.max(this.attributes.con + Math.floor(this.levels.level + this.levels.martialLevel), 1);
    this.arcana.max = Math.floor(3 * this.levels.spellLevel);
    this._calculateLevelAndXp();
  }

  getRollData() {
    const data = super.getRollData();
    return data;
  }

  _calculateLevelAndXp() {
    const progression = calculateXPMilestonesAndLevel(this.xp.total);
    this.levels.level = progression.level;
    this.xp.prevMilestone = progression.xpPrevMilestone;
    this.xp.nextMilestone = progression.xpNextMilestone;
  }

  _calculateRollBonuses() {
    
  }
}
