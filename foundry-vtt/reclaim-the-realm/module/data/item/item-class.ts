import RtRItemBase from "./base-item";

export default class RtRClass extends RtRItemBase {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.Class',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        const requiredStringField = { required: true, nullable: false, blank: false };
        const proficiency = { choices: [0, 0.34, 0.67, 1] };
        return {
            ... super.defineSchema(),
            classCoreFeatureName: new fields.StringField({ ...requiredStringField, initial: 'Change Me' }),
            hpPerLevel: new fields.NumberField({ ...requiredInteger, initial: 6, min: 1 }),

            martialLevelProgression: new fields.AlphaField({ ...proficiency, initial: 0 }),
            knownMartialManeuverTypes: new fields.StringField(),
            spellLevelProgression: new fields.AlphaField({ ...proficiency, initial: 0 }),
            knownSpellDisciplines: new fields.StringField(),

            stabilityProficiency: new fields.AlphaField({ ...proficiency, initial: 0 }),
            dodgeProficiency: new fields.AlphaField({ ...proficiency, initial: 0 }),
            toughnessProficiency: new fields.AlphaField({ ...proficiency, initial: 0 }),
            willpowerProficiency: new fields.AlphaField({ ...proficiency, initial: 0 }),

            classAttributes: new fields.ArrayField(
                new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.attributes) })
            ),
            classSkills: new fields.ArrayField(
                new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.skills) })
            ),

            // Use for now as a Crutch until proper implemented
            classAttributesString: new fields.StringField({ ...requiredStringField, initial: 'Change Me' }),
            classSkillsString: new fields.StringField({ ...requiredStringField, initial: 'Change Me' }),
            skillPointsPerLevel: new fields.NumberField({ ...requiredInteger, initial: 4, min: 1 })
        };
    }
}
