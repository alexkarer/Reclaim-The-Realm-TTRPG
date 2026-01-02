import { DamageType, parseDamageType } from "./DamageType";
import { TextElementWithoutAbility } from "./TextElements";
import agilityTechniquesJson from "../player_rules/techniques/agile_techniques.json";
import brawlTechniquesJson from "../player_rules/techniques/brawl_techniques.json";
import fortitudeTechniquesJson from "../player_rules/techniques/fortitude_techniques.json";
import leaderTechniquesJson from "../player_rules/techniques/leader_techniques.json";
import tacticalTechniquesJson from "../player_rules/techniques/tactical_techniques.json";

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

export enum AbilityColour { GREEN, RED, BLUE, YELLOW, ORANGE, BROWN, COLOURLESS }

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
    outcomesAlways: AbilityActionOutcome[];
    outcomesOnCritSuccess: AbilityActionOutcome[],
    outcomesOnSuccess: AbilityActionOutcome[],
    outcomesOnFail: AbilityActionOutcome[],
    outcomesOnCritFail: AbilityActionOutcome[]
}

export enum AbilityActionType { NO_ACTION, SIMPLE, MARTIAL_TEST, SPELL_TEST, CUSTOM }
export enum AbilityRangeType { NONE, MELEE, FIELDS }
export enum AbilityTargetType { NONE, SELF, CREATURE, ALLY, SPHERE, LINE, CONE, SQUARE, AURA, ALL, CUSTOM }
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
    freeText: TextElementWithoutAbility[];
}

export enum AbilityActionOutcomeType { FREETEXT, DAMAGE, HEAL, STATUS_EFFECT }
export enum DurationUnit { NONE, INDEFINATE, ROUND = '[ROUND]', MINUTE = 'Minute(s)', HOUR = 'Hour(s)' }

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

export function mapIconPath(s: string) {
    // needed for foundryvtt compability
    if (s.startsWith('icon')) {
        return '/assets/' + s 
    }
    return s;
}

const agileSampleAction = agilityTechniquesJson[0].actions[0];
const brawlSampleAction = brawlTechniquesJson[0].actions[0];
const fortitudeSampleAction = fortitudeTechniquesJson[0].actions[0];
const leaderSampleAction = leaderTechniquesJson[0].actions[0];
const tacticalSampleAction = tacticalTechniquesJson[0].actions[0];
type JsonAction = typeof agileSampleAction | typeof brawlSampleAction | typeof fortitudeSampleAction | typeof leaderSampleAction | typeof tacticalSampleAction;

export function mapAction(jsonAction: JsonAction): AbilityAction {
    return {
        type: parseAbilityActionType(jsonAction.actionType),
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
        outcomesAlways: jsonAction.outcomesAlways.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritSuccess: jsonAction.outcomesOnCritSuccess.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnSuccess: jsonAction.outcomesOnSuccess.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnFail: jsonAction.outcomesOnFail.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritFail: jsonAction.outcomesOnCritFail.map(jsonOutcome => mapOutcome(jsonOutcome))
    };
}

const agileSampleOutcome1 = agileSampleAction.outcomesAlways[0];
const agileSampleOutcome2 = agilityTechniquesJson[2].actions[0].outcomesOnSuccess[0];
const brawlSampleOutcome = brawlSampleAction.outcomesOnSuccess[0];
const fortitudeSampleOutcome = fortitudeSampleAction.outcomesOnSuccess[0];
const leaderSampleOutcome = leaderSampleAction.outcomesOnSuccess[0];
const tacticalSampleOutcome = tacticalSampleAction.outcomesOnSuccess[0];
type JsonOutcome = typeof agileSampleOutcome1 | typeof agileSampleOutcome2 | typeof brawlSampleOutcome | typeof fortitudeSampleOutcome | typeof leaderSampleOutcome | typeof tacticalSampleOutcome;

function mapOutcome(jsonOutcome: JsonOutcome): AbilityActionOutcome {
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
        freeText: jsonOutcome.freeText
    };
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
        return AbilityColour.YELLOW;
    } else if (s.startsWith("ORANGE")) {
        return AbilityColour.ORANGE;
    } else if (s.startsWith("BROWN")) {
        return AbilityColour.BROWN;
    } else if (s.startsWith("COLOURLESS")) {
        return AbilityColour.COLOURLESS;
    } else {
        console.error(`Ability colour ${s} not recognized! Setting colourless`);
        return AbilityColour.COLOURLESS;
    }
}

export function parseAbilityActionType(s?: string): AbilityActionType {
    if (!s) {
        console.error("AbilityActionType not defined! Setting NO_ACTION");
        return AbilityActionType.NO_ACTION;
    }
    if (s.startsWith("CUSTOM")) {
        return AbilityActionType.CUSTOM;
    } else if (s.startsWith("MARTIAL_TEST")) {
        return AbilityActionType.MARTIAL_TEST;
    } else if (s.startsWith("SPELL_TEST")) {
        return AbilityActionType.SPELL_TEST;
    } else if (s.startsWith("SIMPLE")) {
        return AbilityActionType.SIMPLE;
    } else if (s.startsWith("NO_ACTION")) {
        return AbilityActionType.NO_ACTION;
    }  else {
        console.error(`AbilityActionType ${s} not recognized! Setting NO_ACTION`);
        return AbilityActionType.NO_ACTION;
    }
}

export function parseAbilityAttribute(s?: string): AbilityAttribute {
    if (!s) {
        console.error("AbilityAttribute not defined! Setting NONE");
        return AbilityAttribute.NONE;
    }
    if (s.startsWith("STR")) {
        return AbilityAttribute.STR;
    } else if (s.startsWith("AGI")) {
        return AbilityAttribute.AGI;
    } else if (s.startsWith("CON")) {
        return AbilityAttribute.CON;
    } else if (s.startsWith("INT")) {
        return AbilityAttribute.INT;
    } else if (s.startsWith("SPI")) {
        return AbilityAttribute.SPI;
    }else if (s.startsWith("PER")) {
        return AbilityAttribute.PER;
    }else if (s.startsWith("CHA")) {
        return AbilityAttribute.CHA;
    } else if (s.startsWith("NONE")) {
        return AbilityAttribute.NONE;
    } else {
        console.error(`AbilityAttribute ${s} not recognized! Setting NONE`);
        return AbilityAttribute.NONE;
    }
}

export function parseAbilityRangeType(s?: string): AbilityRangeType {
    if (!s) {
        console.error("AbilityRangeType not defined! Setting NONE");
        return AbilityRangeType.NONE;
    }
    if (s.startsWith("MELEE")) {
        return AbilityRangeType.MELEE;
    } else if (s.startsWith("FIELDS")) {
        return AbilityRangeType.FIELDS;
    } else if (s.startsWith("NONE")) {
        return AbilityRangeType.NONE;
    } else {
        console.error(`AbilityRangeType ${s} not recognized! Setting NONE`);
        return AbilityRangeType.NONE;
    }
}

export function parseAbilityTargetType(s?: string): AbilityTargetType {
    if (!s) {
        console.error("AbilityTargetType not defined! Setting NONE");
        return AbilityTargetType.NONE;
    }
    if (s.startsWith("SELF")) {
        return AbilityTargetType.SELF;
    } else if (s.startsWith("CREATURE")) {
        return AbilityTargetType.CREATURE;
    } else if (s.startsWith("ALLY")) {
        return AbilityTargetType.ALLY;
    } else if (s.startsWith("CUSTOM")) {
        return AbilityTargetType.CUSTOM;
    } else if (s.startsWith("CONE")) {
        return AbilityTargetType.CONE;
    } else if (s.startsWith("SPHERE")) {
        return AbilityTargetType.SPHERE;
    } else if (s.startsWith("LINE")) {
        return AbilityTargetType.LINE;
    } else if (s.startsWith("SQUARE")) {
        return AbilityTargetType.SQUARE;
    } else if (s.startsWith("AURA")) {
        return AbilityTargetType.AURA;
    } else if (s.startsWith("ALL")) {
        return AbilityTargetType.ALL;
    } else if (s.startsWith("NONE")) {
        return AbilityTargetType.NONE;
    }else {
        console.error(`AbilityTargetType ${s} not recognized! Setting NONE`);
        return AbilityTargetType.NONE;
    }
}

export function parseAbilityOpposingSave(s?: string): AbilityOpposingSave {
    if (!s) {
        console.error("AbilityOpposingSave not defined! Setting NONE");
        return AbilityOpposingSave.NONE;
    }
    if (s.startsWith("STABILITY")) {
        return AbilityOpposingSave.STABILITY
    } else if (s.startsWith("DODGE")) {
        return AbilityOpposingSave.DODGE;
    } else if (s.startsWith("TOUGHNESS")) {
        return AbilityOpposingSave.TOUGHNESS;
    } else if (s.startsWith("WILLPOWER")) {
        return AbilityOpposingSave.WILLPOWER;
    } else if (s.startsWith("NONE")) {
        return AbilityOpposingSave.NONE;
    } else {
        console.error(`AbilityOpposingSave ${s} not recognized! Setting NONE`);
        return AbilityOpposingSave.NONE;
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

export function parseDurationUnit(s?: string): DurationUnit {
    if (!s) {
        console.error("durationUnit not defined! Setting NONE");
        return DurationUnit.NONE;
    }
    if (s.startsWith("ROUND")) {
        return DurationUnit.ROUND
    } else if (s.startsWith("MINUTE")) {
        return DurationUnit.MINUTE;
    } else if (s.startsWith("HOUR")) {
        return DurationUnit.HOUR;
    } else if (s.startsWith("INDEFINATE")) {
        return DurationUnit.INDEFINATE;
    } else if (s.startsWith("NONE")) {
        return DurationUnit.NONE;
    } else {
        console.error(`durationUnit ${s} not recognized! Setting NONE`);
        return DurationUnit.NONE;
    }
}
