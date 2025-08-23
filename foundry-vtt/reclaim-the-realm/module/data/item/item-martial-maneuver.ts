import RtRAbility from "./item-ability";

export default class RtRMartialManeuver extends RtRAbility {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.MartialManeuver',
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
