import RtRAbility, { RtRAbilitySchema } from "./item-ability";

export interface RtRSpellSchema extends RtRAbilitySchema {
    spellDifficulty: foundry.data.fields.NumberField;
    components: foundry.data.fields.StringField;
}

export default class RtRSpell extends RtRAbility<RtRSpellSchema> {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.Spell',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        return {
            ...super.defineSchema(),
            spellDifficulty: new fields.NumberField({ ...requiredInteger, initial: 6, min: 0 }),
            components: new fields.StringField()
        };
    }
}
