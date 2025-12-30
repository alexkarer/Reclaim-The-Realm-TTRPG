import { Ability, mapAction, mapIconPath, parseAbilityColour } from "../../shared/Ability";
import standardAbilitiesJson from "./standard_abilities.json";

type JsonAbility = typeof standardAbilitiesJson[0]

export const STANDARD_ABILITIES: Ability[] = standardAbilitiesJson.map(a => mapAbilitiy(a));

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