import RtRAbility, { RtRAbilitySchema } from "./item-ability";

export interface RRtRNpcAbilitySchema extends RtRAbilitySchema {
    summary: foundry.data.fields.StringField;
}

export default class RtRNpcAbility extends RtRAbility<RRtRNpcAbilitySchema> {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.NpcAbility',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            ... super.defineSchema(),
            summary: new fields.StringField()
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}
