import { Ability, AbilityAction, AbilityActionOutcome, parseAbilityActionOutcomeType, parseAbilityActionType, parseAbilityAttribute, parseAbilityColour, parseAbilityOpposingSave, parseAbilityRangeType, parseAbilityTargetType, parseDurationUnit as parseDurationUnit } from "../../shared/Ability";
import agilityTechniquesJson from "./agile_techniques.json";
import brawlTechniquesJson from "./brawl_techniques.json";
import fortitudeTechniquesJson from "./fortitude_techniques.json";
import leaderTechniquesJson from "./leader_techniques.json";
import tacticalTechniquesJson from "./tactical_techniques.json";

export class Technique extends Ability {
    push!: {
        cost: string;
        effect: string;
    } | null;
}

type JsonTechnique = typeof agilityTechniquesJson[0] | typeof brawlTechniquesJson[0] | typeof fortitudeTechniquesJson[0] | typeof leaderTechniquesJson[0] | typeof tacticalTechniquesJson[0];

export const ALL_TECHNIQUES = [
    ...agilityTechniquesJson.map(t => mapTechnique(t)), 
    ...brawlTechniquesJson.map(t => mapTechnique(t)), 
    ...fortitudeTechniquesJson.map(t => mapTechnique(t)), 
    ...leaderTechniquesJson.map(t => mapTechnique(t)), 
    ...tacticalTechniquesJson.map(t => mapTechnique(t)), 
];

function mapTechnique(jsonTechnique: JsonTechnique): Technique {
    let technique = new Technique();
    technique.name = jsonTechnique.name;
    technique.cost = jsonTechnique.cost;
    technique.tags = jsonTechnique.tags;
    technique.meta = {
        iconPath: mapIconPath(jsonTechnique.meta.iconPath),
        colour: parseAbilityColour(jsonTechnique.meta.colour)
    },
    technique.actions = jsonTechnique.actions.map(jsonAction => mapAction(jsonAction));
    technique.requirements = jsonTechnique.requirements;
    technique.flavorText = jsonTechnique.flavorText;
    technique.push = null;
    if (jsonTechnique.push) {
        technique.push = {
            cost: jsonTechnique.push.cost,
            effect: jsonTechnique.push.effect
        };
    }
    return technique;
}

function mapIconPath(s: string) {
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

function mapAction(jsonAction: JsonAction): AbilityAction {
    return {
        type: parseAbilityActionType(jsonAction.actionType),
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
        damageType: jsonOutcome.damageType,
        critDamage: jsonOutcome.critDamage,
        halfDamage: jsonOutcome.halfDamage,
        healThp: jsonOutcome.healThp,
        statusEffect: jsonOutcome.statusEffect,
        duration: jsonOutcome.duration,
        durationUnit: parseDurationUnit(jsonOutcome.durationUnit),
        freeText: jsonOutcome.freeText
    };
}