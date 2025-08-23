import RtRItemBase, { RtRItemBaseSchema } from "./base-item";

export interface RtRNpcTraitSchema extends RtRItemBaseSchema {
    summary: foundry.data.fields.StringField;
}

export default class RtRNpcTrait extends RtRItemBase<RtRNpcTraitSchema> {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.NpcTrait',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();
        return {
            ... super.defineSchema(),
            summary: new fields.StringField()
        };
    }
}
