import { Ability } from "../shared/Ability";

import hybridAbilitiesJson from "./hybrid_abilities.json";

type HybridAbilitiesJson = typeof hybridAbilitiesJson
type JsonHybridAbility = typeof hybridAbilitiesJson.elementalHybridAbilities[0];

export class HybridAbility extends Ability {
    components?: string;
    spellDifficulty?: number;
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

function mapToHybridAbility(jsonHA: JsonHybridAbility): HybridAbility {
    let hybridAbility = new HybridAbility();
    hybridAbility.name = jsonHA.name;
    hybridAbility.tags = jsonHA.tags;
    hybridAbility.requirements = jsonHA.requirements;
    hybridAbility.cost = jsonHA.cost;
    hybridAbility.range = jsonHA.range;
    hybridAbility.target = jsonHA.target;
    hybridAbility.duration = jsonHA.duration;
    hybridAbility.description = jsonHA.description;
    hybridAbility.flavorText = jsonHA.flavorText;
    hybridAbility.components = jsonHA.components;
    hybridAbility.spellDifficulty = jsonHA.spellDifficulty
    return hybridAbility;
}