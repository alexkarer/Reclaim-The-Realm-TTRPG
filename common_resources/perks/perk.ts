import { Requirements } from '../shared/AbilityRequirements';
import { TextElement } from '../shared/TextElements';
import craftingPerksJson from './crafting_perks.json'
import defensivePerksJson from './defensive_perks.json'
import martialPerksJson from './martial_perks.json'
import otherPerksJson from './other_perks.json'
import skillPerksJson from './skill_perks.json'
import spellcastingPerksJson from './spell_perks.json'
import barbarianPerksJson from './barbarian_perks.json'
import priestPerksJson from './priest_perks.json'
import warlockPerksJson from './warlock_perks.json'

export const craftingPerks: Perk[] = craftingPerksJson;
export const defensivePerks: Perk[] = defensivePerksJson;
export const martialPerks: Perk[] = martialPerksJson;
export const otherPerks: Perk[] = otherPerksJson;
export const skillPerks: Perk[] = skillPerksJson;
export const spellcastingPerks: Perk[] = spellcastingPerksJson;
export const barbarianPerks: Perk[] = barbarianPerksJson;
export const priestPerks: Perk[] = priestPerksJson;
export const warlockPerks: Perk[] = warlockPerksJson;

export const allPerks: Perk[] = [
    ...craftingPerksJson,
    ...defensivePerksJson,
    ...martialPerksJson,
    ...otherPerksJson,
    ...skillPerksJson,
    ...spellcastingPerksJson,
    ...barbarianPerks,
    ...priestPerks,
    ...warlockPerks
]

export type Perk = {
    name: string;
    tags: string[];
    requirements: Requirements;
    textElements: TextElement[];
}