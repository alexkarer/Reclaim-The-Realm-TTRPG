import { Ability, mapAction, mapIconPath, parseAbilityColour } from "../../shared/Ability";
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