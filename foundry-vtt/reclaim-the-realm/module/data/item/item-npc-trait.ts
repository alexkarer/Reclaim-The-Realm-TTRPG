import RtRItemBase from './base-item';

export default class RtRNpcTrait extends RtRItemBase {
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
