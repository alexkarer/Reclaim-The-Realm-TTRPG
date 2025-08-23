import RtRItemBase from './base-item';

export default class RtRPerk extends RtRItemBase {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.Perk',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        const requiredStringField = { required: true, nullable: false, blank: false };
        return {
            ... super.defineSchema(),
            tags: new fields.ArrayField(new fields.StringField(requiredStringField)),
            perkPointsCost: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
            requirements: new fields.SchemaField({
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

                skillRankRequirement: new fields.SchemaField({
                    skill: new fields.StringField(),
                    rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
                }),

                requiredClass: new fields.StringField(),
                requiredPerk: new fields.StringField(),
                requiredNotSelectedPerk: new fields.StringField(),

                otherRequirements: new fields.StringField()
            })
        };
    }
}
