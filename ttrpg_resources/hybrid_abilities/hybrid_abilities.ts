import { Ability } from "../shared/Ability";

import noviceHybridAbilitiesJson from "./novice_hybrid_abilities.json";
import advancedHybridAbilitiesJson from "./advanced_hybrid_abilities.json";
import masterHybridAbilitiesJson from "./master_hybrid_abilities.json";
import martialFocusedHybridAbilitiesJson from "./martial_focused_hybrid_abilities.json";
import spellFocusedHybridAbilitiesJson from "./spell_focused_hybrid_abilities.json";

type HybridAbilitiesJson = typeof noviceHybridAbilitiesJson | typeof advancedHybridAbilitiesJson | typeof masterHybridAbilitiesJson | typeof martialFocusedHybridAbilitiesJson | typeof spellFocusedHybridAbilitiesJson;
type JsonHybridAbility = typeof noviceHybridAbilitiesJson.elementalHybridAbilities[0] | typeof advancedHybridAbilitiesJson.elementalHybridAbilities[0] | typeof masterHybridAbilitiesJson.elementalHybridAbilities[0] | typeof martialFocusedHybridAbilitiesJson.elementalHybridAbilities[0] | typeof spellFocusedHybridAbilitiesJson.elementalHybridAbilities[0];

export class HybridAbility extends Ability {
    components?: string
}

export type HybridAbilityCollection = {
    elementalHybridAbilities: HybridAbility[],
    cosmicHybridAbilities: HybridAbility[],
    manipulationHybridAbilities: HybridAbility[]
}

export const noviceHybridAbilities: HybridAbilityCollection = mapToSpellCollection(noviceHybridAbilitiesJson);
export const advancedHybridAbilities: HybridAbilityCollection = mapToSpellCollection(advancedHybridAbilitiesJson);
export const masterHybridAbilities: HybridAbilityCollection = mapToSpellCollection(masterHybridAbilitiesJson);
export const martialFocusedHybridAbilities: HybridAbilityCollection = mapToSpellCollection(martialFocusedHybridAbilitiesJson);
export const spellFocusedHybridAbilities: HybridAbilityCollection = mapToSpellCollection(spellFocusedHybridAbilitiesJson);

function mapToSpellCollection(hybridAbilitiesJson: HybridAbilitiesJson): HybridAbilityCollection {
    return {
        elementalHybridAbilities: hybridAbilitiesJson.elementalHybridAbilities.map(json => mapToHybridAbility(json)),
        cosmicHybridAbilities: hybridAbilitiesJson.cosmicHybridAbilities.map(json => mapToHybridAbility(json)),
        manipulationHybridAbilities: hybridAbilitiesJson.manipulationHybridAbilities.map(json => mapToHybridAbility(json))
    }
}

function mapToHybridAbility(jsonSpell: JsonHybridAbility): HybridAbility {
    let hybridAbility = new HybridAbility();
    hybridAbility.name = jsonSpell.name;
    hybridAbility.tags = jsonSpell.tags;
    hybridAbility.requirements = jsonSpell.requirements;
    hybridAbility.cost = jsonSpell.cost;
    hybridAbility.range = jsonSpell.range;
    hybridAbility.target = jsonSpell.target;
    hybridAbility.duration = jsonSpell.duration;
    hybridAbility.description = jsonSpell.description;
    hybridAbility.components = jsonSpell.components;
    return hybridAbility;
}