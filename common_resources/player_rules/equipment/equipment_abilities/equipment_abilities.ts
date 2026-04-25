import { Ability, mapAction, parseAbilityColour } from "../../../shared/ability";
import { mapIconPath } from "../../../shared/icons";
import weaponAbilitiesJson from "./weapon_abilities.json";
import otherEquipmentAbilitiesJson from "./other_equipment_abilities.json";
import consumableAbilitiesJson from "./consumables_abilities.json";
import { Technique } from "../../techniques/technique";

export const EQUIPMENT_ABILITIES: Ability[] = [
    ...weaponAbilitiesJson.map(a => mapTechnique(a)),
    ...otherEquipmentAbilitiesJson.map(a => mapAbilitiy(a)),
    ...consumableAbilitiesJson.map(a => mapAbilitiy(a))
];

type JsonAbility = typeof otherEquipmentAbilitiesJson[0]  | typeof otherEquipmentAbilitiesJson[3] | typeof consumableAbilitiesJson[0];
function mapAbilitiy(jsonAbilitiy: JsonAbility): Ability {
    let abilitiy = new Ability();
    abilitiy.name = jsonAbilitiy.name;
    abilitiy.cost = jsonAbilitiy.cost;
    abilitiy.tags = jsonAbilitiy.tags;
    abilitiy.meta = {
        iconPath: mapIconPath(jsonAbilitiy.meta.iconPath),
        colour: parseAbilityColour(jsonAbilitiy.meta.colour)
    },
    abilitiy.actions = jsonAbilitiy.actions.map(jsonAction => mapAction(jsonAction));
    abilitiy.requirements = jsonAbilitiy.requirements;
    abilitiy.flavorText = jsonAbilitiy.flavorText;
    return abilitiy;
}

type JsonTechnique = typeof weaponAbilitiesJson[0];
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