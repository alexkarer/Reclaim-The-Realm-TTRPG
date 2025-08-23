import RtRAbility, { RtRAbilitySchema } from "./item-ability";

export interface RtRMartialManeuverSchema extends RtRAbilitySchema {
}

export default class RtRMartialManeuver extends RtRAbility<RtRMartialManeuverSchema> {
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
