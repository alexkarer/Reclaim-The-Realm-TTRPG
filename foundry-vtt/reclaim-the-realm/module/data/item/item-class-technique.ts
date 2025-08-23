import RtRAbility from "./item-ability";

export default class RtRClassTechnique extends RtRAbility {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.ClassTechnique',
    ];

    static defineSchema() {
        return {
            ... super.defineSchema()
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}
