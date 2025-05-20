import RtRActorBase from './base-actor.mjs';

export default class RtRCharacter extends RtRActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

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

    this.stamina.max = Math.max(this.attributes.con.value + Math.floor(this.levels.level + this.levels.martialLevel), 1);
    this.arcana.max = Math.floor(3 * this.levels.spellLevel);
    this._calculateLevelAndXp();
  }

  getRollData() {
    const data = super.getRollData();
    return data;
  }

  _calculateLevelAndXp() {
    /*
    TODO: import json
    let levelReq = progressionJson.levelRequirementsAndBonuses.filter(lvl => this.xp >= lvl.xp).slice(-2);
    if (levelReq.length === 0) {
        console.error('Error: not able to find level with xp', this.xp);
        return;
    }

    if (levelReq.length === 1) {
      this.levels.level = levelReq[0].level;
      this.xp.prevMilestone = 0;
      this.xp.nextMilestone = levelReq[0].xp;
      return;
    }
    this.levels.level = levelReq[1].level;
    this.xp.prevMilestone = levelReq[0].xp;
    this.xp.nextMilestone = levelReq[1].xp;
    */
  }
}
