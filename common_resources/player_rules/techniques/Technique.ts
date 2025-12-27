import { Ability, AbilityAction, AbilityActionOutcome, parseAbilityActionOutcomeType, parseAbilityActionType, parseAbilityColour, parseAbilityOpposingSave, parseAbilityRangeType, parseAbilityTargetType, parseStatusEffectDurationUnit } from "../../shared/Ability";
import agilityTechniquesJson from "./agile_techniques.json";
import brawlTechniquesJson from "./brawl_techniques.json";
import fortitudeTechniquesJson from "./fortitude_techniques.json";
import leaderTechniquesJson from "./leader_techniques.json";
import tacticalTechniquesJson from "./tactical_techniques.json";

export class Technique extends Ability {
    push?: {
        cost: string;
        effect: string;
    }
}

type JsonTechniques = typeof agilityTechniquesJson;
type JsonTechnique = typeof agilityTechniquesJson.basic[0];

export const allTechniques = [...map(agilityTechniquesJson), ...map(brawlTechniquesJson), ...map(fortitudeTechniquesJson), ...map(leaderTechniquesJson), ...map(tacticalTechniquesJson)];

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
        iconPath: jsonTechnique.meta.iconPath,
        colour: parseAbilityColour(jsonTechnique.meta.colour)
    },
    technique.actions = jsonTechnique.actions.map(jsonAction => mapAction(jsonAction));
    technique.requirements = jsonTechnique.requirements;
    technique.flavorText = jsonTechnique.flavorText;
    return technique;
}

const sampleAction = agilityTechniquesJson.basic[0].actions[0];
type JsonAction = typeof sampleAction;

function mapAction(jsonAction: JsonAction): AbilityAction {
    return {
        type: parseAbilityActionType(jsonAction.actionType),
        customCondition: jsonAction.customCondition,
        rollBonus: jsonAction.rollBonus,
        rangeType: parseAbilityRangeType(jsonAction.rangeType),
        rangeDistanceFields: jsonAction.rangeDistanceFields,
        targetType: parseAbilityTargetType(jsonAction.targetType),
        customTargeting: jsonAction.customTargeting,
        targets: jsonAction.targets,
        targetAreaSizeM: jsonAction.targetAreaSizeM,
        opposingSave: parseAbilityOpposingSave(jsonAction.opposingSave),
        outcomesAlways: jsonAction.outcomesAlways.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritSuccess: jsonAction.outcomesOnCritSuccess.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnSuccess: jsonAction.outcomesOnSuccess.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnFailure: jsonAction.outcomesOnFailure.map(jsonOutcome => mapOutcome(jsonOutcome)),
        outcomesOnCritFailure: jsonAction.outcomesOnCritFailure.map(jsonOutcome => mapOutcome(jsonOutcome))
    };
}

const sampleOutcome = sampleAction.outcomesAlways[0];
type JsonOutcome = typeof sampleOutcome;

function mapOutcome(jsonOutcome: JsonOutcome): AbilityActionOutcome {
    return {
        outcomeType: parseAbilityActionOutcomeType(jsonOutcome.outcomeType),
        damageExpression: jsonOutcome.damageExpression,
        halfDamage: jsonOutcome.halfDamage,
        healExpression: jsonOutcome.healExpression,
        healThp: jsonOutcome.healThp,
        statusEffect: jsonOutcome.statusEffect,
        statusEffectDuration: jsonOutcome.statusEffectDuration,
        statusEffectDurationUnit: parseStatusEffectDurationUnit(jsonOutcome.statusEffectDurationUnit),
        freeText: jsonOutcome.freeText
    };
}