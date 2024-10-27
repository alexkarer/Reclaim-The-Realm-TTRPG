import { Requirements } from '../shared/AbilityRequirements';
import craftingPerksJson from './crafting_perks.json'
import defensivePerksJson from './defensive_perks.json'
import martialPerksJson from './martial_perks.json'
import otherPerksJson from './other_perks.json'
import skillPerksJson from './skill_perks.json'
import spellcastingPerksJson from './spell_perks.json'

export const craftingPerks: Perk[] = craftingPerksJson;
export const defensivePerks: Perk[] = defensivePerksJson;
export const martialPerks: Perk[] = martialPerksJson;
export const otherPerks: Perk[] = otherPerksJson;
export const skillPerks: Perk[] = skillPerksJson;
export const spellcastingPerks: Perk[] =spellcastingPerksJson;

export const allPerks: Perk[] = [
    ...craftingPerksJson,
    ...defensivePerksJson,
    ...martialPerksJson,
    ...otherPerksJson,
    ...skillPerksJson,
    ...spellcastingPerksJson
]

export type Perk = {
    name: string;
    tags: string[];
    requirements: Requirements;
    description: string;
}