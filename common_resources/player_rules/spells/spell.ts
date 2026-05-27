import { Ability, mapAction, parseAbilityColour } from "../../shared/ability";
import { mapIconPath } from "../../shared/icons";
import elementalSpellsJson from "./elemental_spells.json";
import lightSpellsJson from "./light_spells.json";
import darkSpellsJson from "./dark_spells.json";
import psychicSpellsJson from "./psychic_spells.json";
import arcaneSpellsJson from "./arcane_spells.json";

export class Spell extends Ability {
    components!: {
        verbal: string;
        somatic: string;
        material: string;
    };
    castingDifficulty!: number;
    upcast!: {
        mana: number;
        effect: string;
    };
}

export const ALL_SPELLS = [
    ...elementalSpellsJson.map(s => mapSpell(s)),
    ...lightSpellsJson.map(s => mapSpell(s)),
    ...darkSpellsJson.map(s => mapSpell(s)),
    ...psychicSpellsJson.map(s => mapSpell(s)),
    ...arcaneSpellsJson.map(s => mapSpell(s))
];

function mapSpell(jsonSpell: any): Spell {
    let spell = new Spell();
    spell.name = jsonSpell.name;
    spell.cost = jsonSpell.cost;
    spell.tags = jsonSpell.tags;
    spell.meta = {
        iconPath: mapIconPath(jsonSpell.meta.iconPath),
        colour: parseAbilityColour(jsonSpell.meta.colour)
    };
    spell.components = jsonSpell.components;
    spell.castingDifficulty = jsonSpell.castingDifficulty;
    spell.actions = [...jsonSpell.actions].map(jsonAction => mapAction(jsonAction));
    spell.requirements = jsonSpell.requirements;
    spell.upcast = jsonSpell.upcast;
    spell.flavorText = jsonSpell.flavorText;
    return spell;
}
