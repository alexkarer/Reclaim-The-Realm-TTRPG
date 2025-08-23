import RtRAbility, { RtRAbilitySchema } from "./item-ability";

export interface RtRClassTechniqueSchema extends RtRAbilitySchema {
}

export default class RtRClassTechnique extends RtRAbility<RtRClassTechniqueSchema> {
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
