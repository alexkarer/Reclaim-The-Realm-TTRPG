import { Ability, mapAction, parseAbilityColour } from "../../shared/Ability";
import { mapIconPath } from "../../shared/icons";
import weaponAbilitiesJson from "./weapon_abilities.json";

type JsonAbility = typeof weaponAbilitiesJson[0]

export const EQUIPMENT_ABILITIES: Ability[] = weaponAbilitiesJson.map(a => mapAbilitiy(a));

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