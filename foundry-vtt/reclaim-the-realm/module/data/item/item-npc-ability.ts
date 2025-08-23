import RtRAbility from "./item-ability";

export default class RtRNpcAbility extends RtRAbility {
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
