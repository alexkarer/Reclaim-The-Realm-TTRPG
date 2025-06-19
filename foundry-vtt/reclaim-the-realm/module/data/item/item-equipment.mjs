import RtRItemBase from './base-item.mjs';

export default class RtREquipment extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.Equipment',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.tier = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.craftingSkills = new fields.StringField();
    schema.type = new fields.StringField({ choices: Object.keys(CONFIG.RTR.equipmentTypes), initial: 'commodity' });

    schema.costBc = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });

    schema.weightKg = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.weightGramm = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.totalWeightGramm = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.damage = new fields.StringField();

    schema.availableWeapons = new fields.StringField();
    schema.recoverable = new fields.BooleanField({ initial: false, required: true, nullable: false });

    schema.damageBlock = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.manoeuvrePenalty = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.movementPenalty = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.shieldBlock = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.damageThreshold = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.totalWeightGramm = this.weightKg * 1000 + this.weightGramm;
  }
}
