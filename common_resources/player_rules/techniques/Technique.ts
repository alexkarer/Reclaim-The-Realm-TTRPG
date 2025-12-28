import { Ability, AbilityAction, AbilityActionOutcome, parseAbilityActionOutcomeType, parseAbilityActionType, parseAbilityAttribute, parseAbilityColour, parseAbilityOpposingSave, parseAbilityRangeType, parseAbilityTargetType, parseStatusEffectDurationUnit } from "../../shared/Ability";
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

type JsonTechniques = typeof agilityTechniquesJson | typeof brawlTechniquesJson;
type JsonTechnique = typeof agilityTechniquesJson.basic[0] | typeof brawlTechniquesJson.basic[0];

export const ALL_TECHNIQUES = [...map(agilityTechniquesJson), ...map(brawlTechniquesJson), ...map(fortitudeTechniquesJson), ...map(leaderTechniquesJson), ...map(tacticalTechniquesJson)];

function map(jsonTechniques: JsonTechniques) : Technique[] {
    return [
        ...jsonTechniques.basic.map(basic => mapTechnique(basic)),
        ...jsonTechniques.advanced.map(advanced => mapTechnique(advanced)),
        ...jsonTechniques.master.map(master => mapTechnique(master)),
        ...jsonTechniques.transcendent.map(transcendent => mapTechnique(transcendent))
    ];
}

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

const agileSampleAction = agilityTechniquesJson.basic[0].actions[0];
const brawlSampleAction = brawlTechniquesJson.basic[0].actions[0];
type JsonAction = typeof agileSampleAction | typeof brawlSampleAction;

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

const agileSampleOutcome = agileSampleAction.outcomesAlways[0];
const brawlSampleOutcome = brawlSampleAction.outcomesOnSuccess[0];
type JsonOutcome = typeof agileSampleOutcome | typeof brawlSampleOutcome;

function mapOutcome(jsonOutcome: JsonOutcome): AbilityActionOutcome {
    return {
        outcomeType: parseAbilityActionOutcomeType(jsonOutcome.outcomeType),
        damageExpression: jsonOutcome.damageExpression,
        damageType: jsonOutcome.damageType,
        critDamage: jsonOutcome.critDamage,
        halfDamage: jsonOutcome.halfDamage,
        healExpression: jsonOutcome.healExpression,
        healThp: jsonOutcome.healThp,
        statusEffect: jsonOutcome.statusEffect,
        statusEffectDuration: jsonOutcome.statusEffectDuration,
        statusEffectDurationUnit: parseStatusEffectDurationUnit(jsonOutcome.statusEffectDurationUnit),
        freeText: jsonOutcome.freeText
    };
}