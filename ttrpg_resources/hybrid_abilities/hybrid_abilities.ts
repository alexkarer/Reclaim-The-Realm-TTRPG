import { Ability } from "../shared/Ability";

import hybridAbilitiesJson from "./hybrid_abilities.json";

type HybridAbilitiesJson = typeof hybridAbilitiesJson
type JsonHybridAbility = typeof hybridAbilitiesJson.elementalHybridAbilities[0];

export class HybridAbility extends Ability {
    components?: string
}

export type HybridAbilityCollection = {
    elementalHybridAbilities: HybridAbility[],
    cosmicHybridAbilities: HybridAbility[],
    manipulationHybridAbilities: HybridAbility[]
}

export const allHybridAbilities: HybridAbility[] = mapToSpellCollection(hybridAbilitiesJson);

function mapToSpellCollection(hybridAbilitiesJson: HybridAbilitiesJson): HybridAbility[] {
    return [
        ...hybridAbilitiesJson.elementalHybridAbilities.map(json => mapToHybridAbility(json)),
        ...hybridAbilitiesJson.cosmicHybridAbilities.map(json => mapToHybridAbility(json)),
        ...hybridAbilitiesJson.manipulationHybridAbilities.map(json => mapToHybridAbility(json))
    ];
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