import RtRItemBase from './base-item.mjs';

export default class RtRPerk extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.Perk',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredStringField = { required: true, nullable: false, blank: false };
    const schema = super.defineSchema();
    
    schema.tags = new fields.ArrayField(new fields.StringField(requiredStringField));

    schema.perkPointsCost = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),

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
          skill: new fields.StringField(requiredStringField),
          rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        })
      ),

      requiredClass: new fields.StringField(),
      requiredPerks: new fields.ArrayField(new fields.StringField(requiredStringField)),
      requiredNotSelectedPerks: new fields.ArrayField(new fields.StringField(requiredStringField)), 

      otherRequirements: new fields.StringField()
    });
    return schema;
  }

  
}
