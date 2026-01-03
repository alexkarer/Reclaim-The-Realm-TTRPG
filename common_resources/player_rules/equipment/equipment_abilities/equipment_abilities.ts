import { Ability, mapAction, parseAbilityColour } from "../../../shared/Ability";
import { mapIconPath } from "../../../shared/icons";
import weaponAbilitiesJson from "./weapon_abilities.json";
import otherEquipmentAbilitiesJson from "./other_equipment_abilities.json";
import consumableAbilitiesJson from "./consumables_abilities.json";

export const EQUIPMENT_ABILITIES: Ability[] = [
    ...weaponAbilitiesJson.map(a => mapAbilitiy(a)),
    ...otherEquipmentAbilitiesJson.map(a => mapAbilitiy(a)),
    ...consumableAbilitiesJson.map(a => mapAbilitiy(a))
];

type JsonAbility = typeof weaponAbilitiesJson[0] | typeof otherEquipmentAbilitiesJson[0]  | typeof otherEquipmentAbilitiesJson[3] | typeof consumableAbilitiesJson[0];
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