import { TextElementWithoutAbility } from "./TextElements";

export class Ability {
    name!: string;
    cost!: AbilityCost;
    tags!: string[];
    meta!: {
        iconPath: string,
        colour: AbilityColour
    }
    requirements!: Requirements;
    actions!: AbilityAction[];
    flavorText!: TextElementWithoutAbility[];
}

export type AbilityCost = {
    ap: number,
    mp: number,
    arcana: number,
    stamina: number,
    life: number,
    other: string
}

export enum AbilityColour { GREEN, RED, BLUE, YELLOW, COLOURLESS }

export type AbilityAction = {
    type: AbilityActionType,
    customCondition: string
    rollBonus: string,
    rangeType: AbilityRangeType,
    rangeDistanceFields: number
    targetType: AbilityTargetType,
    customTargeting: string,
    targets: number,
    targetAreaSizeM: number,
    opposingSave: AbilityOpposingSave,
    outcomesAlways: AbilityActionOutcome[];
    outcomesOnCritSuccess: AbilityActionOutcome[],
    outcomesOnSuccess: AbilityActionOutcome[],
    outcomesOnFailure: AbilityActionOutcome[],
    outcomesOnCritFailure: AbilityActionOutcome[]
}

export enum AbilityActionType { FIXED, MARTIAL_TEST, SPELL_TEST, D20_TEST, CUSTOM_CONDITION }
export enum AbilityRangeType { UNSPECIFIED, MELEE, FIELDS }
export enum AbilityTargetType { UNSPECIFIED, SELF, INDIVIDUAL, SPHERE, LINE, CONE, CUSTOM }
export enum AbilityOpposingSave { UNSPECIFIED, STABILITY, DODGE, TOUGHNESS, WILLPOWER }

export type AbilityActionOutcome = {
    outcomeType: AbilityActionOutcomeType,
    damageExpression: string,
    halfDamage: boolean,
    healExpression: string,
    healThp: boolean,
    statusEffect: string,
    statusEffectDuration: number,
    statusEffectDurationUnit: StatusEffectDurationUnit,
    freeText: TextElementWithoutAbility[];
}

export enum AbilityActionOutcomeType { FREETEXT, DAMAGE, HEAL, STATUS_EFFECT }
export enum StatusEffectDurationUnit { ROUNDS, MINUTES, HOURS, UNSPECIFIED }

export class AbilityOld {
    name!: string;
    tags!: string[];
    requirements!: Requirements;
    cost!: string;
    range!: string;
    target!: string;
    duration!: string;
    description!: TextElementWithoutAbility[];
    flavorText!: TextElementWithoutAbility[];
}

export type Requirements = {
    requiredLevels: LevelRequirement[];
    requiredAttributes: AttributeRequirement[];
    requiredPerks: string[];
    otherRequirements: string[];
};

export type AttributeRequirement = {
    amount: number;
    attribute: string;
}

export type LevelRequirement = {
    amount: number;
    levelType: string;
}

export function parseAbilityColour(s?: string): AbilityColour {
    if (!s) {
        console.error("Ability colour not defined! Setting colourless");
        return AbilityColour.COLOURLESS;
    }
    if (s.startsWith("BLUE")) {
        return AbilityColour.BLUE;
    } else if (s.startsWith("RED")) {
        return AbilityColour.RED;
    } else if (s.startsWith("GREEN")) {
        return AbilityColour.GREEN;
    } else if (s.startsWith("YELLOW")) {
        return AbilityColour.YELLOW
    } else if (s.startsWith("COLOURLESS")) {
        return AbilityColour.COLOURLESS
    } else {
        console.error(`Ability colour ${s} not recognized! Setting colourless`);
        return AbilityColour.COLOURLESS;
    }
}

export function parseAbilityActionType(s?: string): AbilityActionType {
    if (!s) {
        console.error("AbilityActionType not defined! Setting FIXED");
        return AbilityActionType.FIXED;
    }
    if (s.startsWith("CUSTOM_CONDITION")) {
        return AbilityActionType.CUSTOM_CONDITION;
    } else if (s.startsWith("D20_TEST")) {
        return AbilityActionType.D20_TEST;
    } else if (s.startsWith("MARTIAL_TEST")) {
        return AbilityActionType.MARTIAL_TEST;
    } else if (s.startsWith("SPELL_TEST")) {
        return AbilityActionType.SPELL_TEST;
    } else if (s.startsWith("FIXED")) {
        return AbilityActionType.FIXED;
    }  else {
        console.error(`AbilityActionType ${s} not recognized! Setting FIXED`);
        return AbilityActionType.FIXED;
    }
}

export function parseAbilityRangeType(s?: string): AbilityRangeType {
    if (!s) {
        console.error("AbilityRangeType not defined! Setting UNSPECIFIED");
        return AbilityRangeType.UNSPECIFIED;
    }
    if (s.startsWith("MELEE")) {
        return AbilityRangeType.MELEE;
    } else if (s.startsWith("FIELDS")) {
        return AbilityRangeType.FIELDS;
    } else if (s.startsWith("UNSPECIFIED")) {
        return AbilityRangeType.UNSPECIFIED;
    } else {
        console.error(`AbilityRangeType ${s} not recognized! Setting UNSPECIFIED`);
        return AbilityRangeType.UNSPECIFIED;
    }
}

export function parseAbilityTargetType(s?: string): AbilityTargetType {
    if (!s) {
        console.error("AbilityTargetType not defined! Setting UNSPECIFIED");
        return AbilityTargetType.UNSPECIFIED;
    }
    if (s.startsWith("SELF")) {
        return AbilityTargetType.SELF;
    } else if (s.startsWith("INDIVIDUAL")) {
        return AbilityTargetType.INDIVIDUAL;
    } else if (s.startsWith("CUSTOM")) {
        return AbilityTargetType.CUSTOM;
    } else if (s.startsWith("CONE")) {
        return AbilityTargetType.CONE;
    } else if (s.startsWith("SPHERE")) {
        return AbilityTargetType.SPHERE;
    } else if (s.startsWith("LINE")) {
        return AbilityTargetType.LINE;
    } else if (s.startsWith("UNSPECIFIED")) {
        return AbilityTargetType.UNSPECIFIED;
    }else {
        console.error(`AbilityTargetType ${s} not recognized! Setting UNSPECIFIED`);
        return AbilityTargetType.UNSPECIFIED;
    }
}

export function parseAbilityOpposingSave(s?: string): AbilityOpposingSave {
    if (!s) {
        console.error("AbilityOpposingSave not defined! Setting UNSPECIFIED");
        return AbilityOpposingSave.UNSPECIFIED;
    }
    if (s.startsWith("STABILITY")) {
        return AbilityOpposingSave.STABILITY
    } else if (s.startsWith("DODGE")) {
        return AbilityOpposingSave.DODGE;
    } else if (s.startsWith("TOUGHNESS")) {
        return AbilityOpposingSave.TOUGHNESS;
    } else if (s.startsWith("WILLPOWER")) {
        return AbilityOpposingSave.WILLPOWER;
    } else if (s.startsWith("UNSPECIFIED")) {
        return AbilityOpposingSave.UNSPECIFIED;
    } else {
        console.error(`AbilityOpposingSave ${s} not recognized! Setting UNSPECIFIED`);
        return AbilityOpposingSave.UNSPECIFIED;
    }
}

export function parseAbilityActionOutcomeType(s?: string): AbilityActionOutcomeType {
    if (!s) {
        console.error("AbilityActionOutcomeType not defined! Setting FREETEXT");
        return AbilityActionOutcomeType.FREETEXT;
    }
    if (s.startsWith("DAMAGE")) {
        return AbilityActionOutcomeType.DAMAGE
    } else if (s.startsWith("HEAL")) {
        return AbilityActionOutcomeType.HEAL;
    } else if (s.startsWith("STATUS_EFFECT")) {
        return AbilityActionOutcomeType.STATUS_EFFECT;
    } else if (s.startsWith("FREETEXT")) {
        return AbilityActionOutcomeType.FREETEXT;
    } else {
        console.error(`AbilityActionOutcomeType ${s} not recognized! Setting FREETEXT`);
        return AbilityActionOutcomeType.FREETEXT;
    }
}

export function parseStatusEffectDurationUnit(s?: string): StatusEffectDurationUnit {
    if (!s) {
        console.error("StatusEffectDurationUnit not defined! Setting UNSPECIFIED");
        return StatusEffectDurationUnit.UNSPECIFIED;
    }
    if (s.startsWith("ROUNDS")) {
        return StatusEffectDurationUnit.ROUNDS
    } else if (s.startsWith("MINUTES")) {
        return StatusEffectDurationUnit.MINUTES;
    } else if (s.startsWith("HOURS")) {
        return StatusEffectDurationUnit.HOURS;
    } else if (s.startsWith("UNSPECIFIED")) {
        return StatusEffectDurationUnit.UNSPECIFIED;
    } else {
        console.error(`StatusEffectDurationUnit ${s} not recognized! Setting UNSPECIFIED`);
        return StatusEffectDurationUnit.UNSPECIFIED;
    }
}
