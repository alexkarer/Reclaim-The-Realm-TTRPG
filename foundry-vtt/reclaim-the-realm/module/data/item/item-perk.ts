import RtRItemBase, { RtRItemBaseSchema } from "./base-item";

export interface RtRPerkSchema extends RtRItemBaseSchema {
    tags: foundry.data.fields.ArrayField<foundry.data.fields.StringField>;
    perkPointsCost: foundry.data.fields.NumberField;
    requirements: foundry.data.fields.SchemaField<RtRPerkRequirementSchema>;
}

export interface RtRPerkRequirementSchema extends foundry.data.fields.DataSchema {
    minimumLevel: foundry.data.fields.NumberField;
    minimumMartialLevel: foundry.data.fields.NumberField;
    minimumSpellLevel: foundry.data.fields.NumberField;

    minimumStr: foundry.data.fields.NumberField;
    minimumAgi: foundry.data.fields.NumberField;
    minimumCon: foundry.data.fields.NumberField;
    minimumInt: foundry.data.fields.NumberField;
    minimumSpi: foundry.data.fields.NumberField;
    minimumPer: foundry.data.fields.NumberField;
    minimumCha: foundry.data.fields.NumberField;

    skillRankRequirement: foundry.data.fields.SchemaField<RtRPerkRequirementsSkillRankSchema>;

    requiredClass: foundry.data.fields.StringField
    requiredPerk: foundry.data.fields.StringField
    requiredNotSelectedPerk: foundry.data.fields.StringField

    otherRequirements: foundry.data.fields.StringField
}

export interface RtRPerkRequirementsSkillRankSchema extends foundry.data.fields.DataSchema {
    skill: foundry.data.fields.StringField;
    rank: foundry.data.fields.NumberField;
}

export default class RtRPerk extends RtRItemBase<RtRPerkSchema> {
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
