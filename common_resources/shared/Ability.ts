import { DamageType, parseDamageType } from "./damageType";
import { TextElementWithoutAbility } from "./textElements";

export class Ability {
    name!: string;
    cost!: AbilityCost;
    tags!: string[];
    meta!: {
        iconPath: string,
        colour: AbilityColour,
        darkText: boolean
    }
    requirements!: Requirements;
    actions!: AbilityAction[];
    flavorText!: TextElementWithoutAbility[];
}

export type AbilityCost = {
    ap: number,
    mp: number,
    mana: number,
    stamina: number,
    life: number,
    other: string
}

export enum AbilityColour { GREEN, RED, BLUE, YELLOW, ORANGE, BROWN, WHITE, COLOURLESS, REDGREEN, BLUEWHITE, LIGHTGREEN, BLACK, DARKPURPLE, PINK, LIGHTBLUE, LIGHTPURPLE, TEAL, DARKYELLOW }

export type AbilityAction = {
    type: AbilityActionType,
    customAction: string,
    customCondition: string | null,
    attribute: AbilityAttribute,
    rangeType: AbilityRangeType,
    rangeDistanceFields: number
    targetType: AbilityTargetType,
    customTargeting: string,
    targets: number,
    targetAreaSizeFields: number,
    opposingSave: AbilityOpposingSave,
    duration: number,
    durationUnit: DurationUnit,
    customDuration: string | null,
    outcomesAlways: AbilityActionOutcome[];
    outcomesOnCritSuccess: AbilityActionOutcome[],
    outcomesOnSuccess: AbilityActionOutcome[],
    outcomesOnFail: AbilityActionOutcome[],
    outcomesOnCritFail: AbilityActionOutcome[]
}

export enum AbilityActionType { NO_ACTION, SIMPLE, MARTIAL_TEST, SPELL_TEST, CUSTOM }
export enum AbilityRangeType { NONE, MELEE, FIELDS, RANGE_DROPOFF }
export enum AbilityTargetType { NONE, SELF, CREATURE, ALLY, SPHERE, LINE, CONE, SQUARE, AURA, CLEAVE, ALL, CUSTOM }
export enum AbilityOpposingSave { NONE, STABILITY = 'STABILITY', DODGE = 'DODGE', TOUGHNESS = 'TOUGHNESS', WILLPOWER = 'WILLPOWER' }
export enum AbilityAttribute { NONE, STR = 'STR', AGI = 'AGI', CON = 'CON', INT = 'INT', SPI = 'SPI', PER = 'PER', CHA = 'CHA' }

export type AbilityActionOutcome = {
    outcomeType: AbilityActionOutcomeType,
    expression: string,
    damageType: DamageType,
    halfDamage: boolean,
    critDamage: boolean,
    healThp: boolean,
    statusEffect: string,
    duration: number,
    durationUnit: DurationUnit,
    customDuration: string | null,
    freeText: TextElementWithoutAbility[];
}

export enum AbilityActionOutcomeType { FREETEXT, DAMAGE, HEAL, STATUS_EFFECT }
export enum DurationUnit { NONE, INDEFINATE, CUSTOM, ROUND = '[ROUND]', MINUTE = 'Minute(s)', HOUR = 'Hour(s)' }

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

/*
 * COMMON MAPPING METHODS 
 */

export function mapAction(jsonAction: any): AbilityAction {
    return {
        type: parseAbilityActionType(jsonAction.actionType ?? ''),
        customAction: jsonAction.customAction,
        customCondition: jsonAction.customCondition,
        attribute: parseAbilityAttribute(jsonAction.attribute),
        rangeType: parseAbilityRangeType(jsonAction.rangeType),
        rangeDistanceFields: jsonAction.rangeDistanceFields,
        targetType: parseAbilityTargetType(jsonAction.targetType),
        customTargeting: jsonAction.customTargeting,
        targets: jsonAction.targets,
        targetAreaSizeFields: jsonAction.targetAreaSizeFields,
        opposingSave: parseAbilityOpposingSave(jsonAction.opposingSave),
        duration: jsonAction.duration,
        durationUnit: parseDurationUnit(jsonAction.durationUnit),
        customDuration: jsonAction.customDuration,
        outcomesAlways: [...jsonAction.outcomesAlways].map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritSuccess: [...jsonAction.outcomesOnCritSuccess].map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnSuccess: [...jsonAction.outcomesOnSuccess].map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnFail: [...jsonAction.outcomesOnFail].map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritFail: [...jsonAction.outcomesOnCritFail].map(jsonOutcome => mapOutcome(jsonOutcome))
    };
}

function mapOutcome(jsonOutcome: any): AbilityActionOutcome {
    return {
        outcomeType: parseAbilityActionOutcomeType(jsonOutcome.outcomeType),
        expression: jsonOutcome.expression,
        damageType: parseDamageType(jsonOutcome.damageType),
        critDamage: jsonOutcome.critDamage,
        halfDamage: jsonOutcome.halfDamage,
        healThp: jsonOutcome.healThp,
        statusEffect: jsonOutcome.statusEffect,
        duration: jsonOutcome.duration,
        durationUnit: parseDurationUnit(jsonOutcome.durationUnit),
        customDuration: jsonOutcome.customDuration,
        freeText: jsonOutcome.freeText,
    };
}

export function parseAbilityColour(s?: string): AbilityColour {
    if (!s) {
        console.error("Ability colour not defined! Setting colourless");
        return AbilityColour.COLOURLESS;
    }
    switch (s) {
        case "BLUE": return AbilityColour.BLUE;
        case "RED": return AbilityColour.RED;
        case "GREEN": return AbilityColour.GREEN;
        case "YELLOW": return AbilityColour.YELLOW;
        case "ORANGE": return AbilityColour.ORANGE;
        case "BROWN": return AbilityColour.BROWN;
        case "WHITE": return AbilityColour.WHITE;
        case "COLOURLESS": return AbilityColour.COLOURLESS;
        case "REDGREEN": return AbilityColour.REDGREEN;
        case "BLUEWHITE": return AbilityColour.BLUEWHITE;
        case "LIGHTGREEN": return AbilityColour.LIGHTGREEN;
        case "BLACK": return AbilityColour.BLACK;
        case "DARKPURPLE": return AbilityColour.DARKPURPLE;
        case "PINK": return AbilityColour.PINK;
        case "LIGHTBLUE": return AbilityColour.LIGHTBLUE;
        case "LIGHTPURPLE": return AbilityColour.LIGHTPURPLE;
        case "TEAL": return AbilityColour.TEAL;
        case "DARKYELLOW": return AbilityColour.DARKYELLOW;
        default: console.error(`Ability colour ${s} not recognized! Setting colourless`); return AbilityColour.COLOURLESS;
    }
}

export function parseAbilityActionType(s?: string): AbilityActionType {
    if (!s) {
        console.error("AbilityActionType not defined! Setting NO_ACTION");
        return AbilityActionType.NO_ACTION;
    }
    switch (s) {
        case "CUSTOM": return AbilityActionType.CUSTOM;
        case "MARTIAL_TEST": return AbilityActionType.MARTIAL_TEST;
        case "SPELL_TEST": return AbilityActionType.SPELL_TEST;
        case "SIMPLE": return AbilityActionType.SIMPLE;
        case "NO_ACTION": return AbilityActionType.NO_ACTION;
        default: console.error(`AbilityActionType ${s} not recognized! Setting NO_ACTION`); return AbilityActionType.NO_ACTION;
    }
}

export function parseAbilityAttribute(s?: string): AbilityAttribute {
    if (!s) {
        console.error("AbilityAttribute not defined! Setting NONE");
        return AbilityAttribute.NONE;
    }
    switch (s) {
        case "STR": return AbilityAttribute.STR;
        case "AGI": return AbilityAttribute.AGI;
        case "CON": return AbilityAttribute.CON;
        case "INT": return AbilityAttribute.INT;
        case "SPI": return AbilityAttribute.SPI;
        case "PER": return AbilityAttribute.PER;
        case "CHA": return AbilityAttribute.CHA;
        case "NONE": return AbilityAttribute.NONE;
        default: console.error(`AbilityAttribute ${s} not recognized! Setting NONE`); return AbilityAttribute.NONE;
    }
}

export function parseAbilityRangeType(s?: string): AbilityRangeType {
    if (!s) {
        console.error("AbilityRangeType not defined! Setting NONE");
        return AbilityRangeType.NONE;
    }
    switch (s) {
        case "MELEE": return AbilityRangeType.MELEE;
        case "FIELDS": return AbilityRangeType.FIELDS;
        case "RANGE_DROPOFF": return AbilityRangeType.RANGE_DROPOFF;
        case "NONE": return AbilityRangeType.NONE;
        default: console.error(`AbilityRangeType ${s} not recognized! Setting NONE`); return AbilityRangeType.NONE;
    }
}

export function parseAbilityTargetType(s?: string): AbilityTargetType {
    if (!s) {
        console.error("AbilityTargetType not defined! Setting NONE");
        return AbilityTargetType.NONE;
    }
    switch (s) {
        case "SELF": return AbilityTargetType.SELF;
        case "CREATURE": return AbilityTargetType.CREATURE;
        case "ALLY": return AbilityTargetType.ALLY;
        case "CUSTOM": return AbilityTargetType.CUSTOM;
        case "CONE": return AbilityTargetType.CONE;
        case "SPHERE": return AbilityTargetType.SPHERE;
        case "LINE": return AbilityTargetType.LINE;
        case "SQUARE": return AbilityTargetType.SQUARE;
        case "AURA": return AbilityTargetType.AURA;
        case "CLEAVE": return AbilityTargetType.CLEAVE;
        case "ALL": return AbilityTargetType.ALL;
        case "NONE": return AbilityTargetType.NONE;
        default: console.error(`AbilityTargetType ${s} not recognized! Setting NONE`); return AbilityTargetType.NONE;
    }
}

export function parseAbilityOpposingSave(s?: string): AbilityOpposingSave {
    if (!s) {
        console.error("AbilityOpposingSave not defined! Setting NONE");
        return AbilityOpposingSave.NONE;
    }
    switch (s) {
        case "STABILITY": return AbilityOpposingSave.STABILITY;
        case "DODGE": return AbilityOpposingSave.DODGE;
        case "TOUGHNESS": return AbilityOpposingSave.TOUGHNESS;
        case "WILLPOWER": return AbilityOpposingSave.WILLPOWER;
        case "NONE": return AbilityOpposingSave.NONE;
        default: console.error(`AbilityOpposingSave ${s} not recognized! Setting NONE`); return AbilityOpposingSave.NONE;
    }
}

export function parseAbilityActionOutcomeType(s?: string): AbilityActionOutcomeType {
    if (!s) {
        console.error("AbilityActionOutcomeType not defined! Setting FREETEXT");
        return AbilityActionOutcomeType.FREETEXT;
    }
    switch (s) {
        case "DAMAGE": return AbilityActionOutcomeType.DAMAGE;
        case "HEAL": return AbilityActionOutcomeType.HEAL;
        case "STATUS_EFFECT": return AbilityActionOutcomeType.STATUS_EFFECT;
        case "FREETEXT": return AbilityActionOutcomeType.FREETEXT;
        default: console.error(`AbilityActionOutcomeType ${s} not recognized! Setting FREETEXT`); return AbilityActionOutcomeType.FREETEXT;
    }
}

export function parseDurationUnit(s?: string): DurationUnit {
    if (!s) {
        console.error("durationUnit not defined! Setting NONE");
        return DurationUnit.NONE;
    }
    switch (s) {
        case "ROUND": return DurationUnit.ROUND;
        case "MINUTE": return DurationUnit.MINUTE;
        case "HOUR": return DurationUnit.HOUR;
        case "INDEFINATE": return DurationUnit.INDEFINATE;
        case "CUSTOM": return DurationUnit.CUSTOM;
        case "NONE": return DurationUnit.NONE;
        default: console.error(`DurationUnit ${s} not recognized! Setting NONE`); return DurationUnit.NONE;
    }
}
