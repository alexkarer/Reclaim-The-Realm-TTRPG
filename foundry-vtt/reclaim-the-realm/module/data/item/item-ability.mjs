import RtRItemBase from './base-item.mjs';

export default class RtRAbility extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Ability',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.tags = new fields.StringField();

    schema.requirements = new fields.SchemaField({
      minimumLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumMartialLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumSpellLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      minimumStr: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumAgi: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumCon: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumInt: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumSpi: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumPer: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumCha: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      skillRankRequirements: new fields.ArrayField(
        new fields.SchemaField({
          skill: new fields.StringField({ required: true, nullable: false, blank: false}),
          rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        })
      ),

      requiredPerks: new fields.ArrayField(
        new fields.StringField({ required: true, nullable: false, blank: false})
      ),

      otherRequirements: new fields.StringField()
    });

    schema.usageCost = new fields.SchemaField({
      rawStringCost: new fields.StringField(),
      apCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      mpCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      isFree: new fields.BooleanField({ initial: false, required: true, nullable: false }),
      arcanaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      staminaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      otherResourceCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      otherResourceName: new fields.StringField()
    });

    schema.range = new fields.StringField();
    schema.targets = new fields.StringField();
    schema.duration = new fields.StringField();

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    // Build the formula dynamically using string interpolation
    
  }
}
