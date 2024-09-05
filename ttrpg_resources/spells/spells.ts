import { Ability } from '../globals/Ability';

import firstPowerSpellsJson from './1st_power_spells.json'
import secondPowerSpellsJson from './2nd_power_spells.json'
import thirdPowerSpellsJson from './3rd_power_spells.json'
import fourthPowerSpellsJson from './4th_power_spells.json'
import fifthPowerSpellsJson from './5th_power_spells.json'
import sixthPowerSpellsJson from './6th_power_spells.json'

type JsonSpells = typeof firstPowerSpellsJson | typeof secondPowerSpellsJson | typeof thirdPowerSpellsJson | typeof fourthPowerSpellsJson | typeof fifthPowerSpellsJson | typeof sixthPowerSpellsJson;
type JsonSpell = typeof firstPowerSpellsJson.elementalSpells.pyromancySpells[0] | typeof secondPowerSpellsJson.elementalSpells.pyromancySpells[0] | typeof thirdPowerSpellsJson.elementalSpells.pyromancySpells[0] | typeof fourthPowerSpellsJson.elementalSpells.pyromancySpells[0] | typeof fifthPowerSpellsJson.elementalSpells.pyromancySpells[0] | typeof sixthPowerSpellsJson.elementalSpells.pyromancySpells[0];

export class Spell extends Ability {
    components?: string
    atHigherSpellPower?: string
}

export type SpellCollection = {
    elementalSpells: Spell[],
    cosmicSpells: Spell[],
    manipulationSpells: Spell[]
}

export const firstPowerSpells: SpellCollection = mapToSpellCollection(firstPowerSpellsJson);
export const secondPowerSpells: SpellCollection = mapToSpellCollection(secondPowerSpellsJson);
export const thirdPowerSpells: SpellCollection = mapToSpellCollection(thirdPowerSpellsJson);
export const fourthPowerSpells: SpellCollection = mapToSpellCollection(fourthPowerSpellsJson);
export const fifthPowerSpells: SpellCollection = mapToSpellCollection(fifthPowerSpellsJson);
export const sixthPowerSpells: SpellCollection = mapToSpellCollection(sixthPowerSpellsJson);


function mapToSpellCollection(jsonSpells: JsonSpells): SpellCollection {
    return {
        elementalSpells: [
            ... jsonSpells.elementalSpells.pyromancySpells.map(json => mapToSpell(json)),
            ... jsonSpells.elementalSpells.geomancySpell.map(json => mapToSpell(json)),
            ... jsonSpells.elementalSpells.hydromancySpells.map(json => mapToSpell(json)),
            ... jsonSpells.elementalSpells.aeromancySpells.map(json => mapToSpell(json))
        ],
        cosmicSpells: [
            ... jsonSpells.cosmicSpell.lightSpells.map(json => mapToSpell(json)),
            ... jsonSpells.cosmicSpell.restorationSpells.map(json => mapToSpell(json)),
            ... jsonSpells.cosmicSpell.necromancySpell.map(json => mapToSpell(json)),
            ... jsonSpells.cosmicSpell.shadowSpell.map(json => mapToSpell(json)),
            ... jsonSpells.cosmicSpell.divinationSpell.map(json => mapToSpell(json))
        ],
        manipulationSpells: [
            ... jsonSpells.manipulationSpells.telekinesisSpells.map(json => mapToSpell(json)),
            ... jsonSpells.manipulationSpells.telepathySpells.map(json => mapToSpell(json)),
            ... jsonSpells.manipulationSpells.transmutationSpells.map(json => mapToSpell(json)),
            ... jsonSpells.manipulationSpells.conjurationSpells.map(json => mapToSpell(json)),
            ... jsonSpells.manipulationSpells.illusionSpells.map(json => mapToSpell(json)),
            ... jsonSpells.manipulationSpells.teleportationSpells.map(json => mapToSpell(json))
        ]
    }
}

function mapToSpell(jsonSpell: JsonSpell): Spell {
    let spell = new Spell();
    spell.name = jsonSpell.name;
    spell.tags = jsonSpell.tags;
    spell.requirements = jsonSpell.requirements;
    spell.cost = jsonSpell.cost;
    spell.range = jsonSpell.range;
    spell.target = jsonSpell.target;
    spell.duration = jsonSpell.duration;
    spell.description = jsonSpell.description;
    spell.components = jsonSpell.components;
    spell.atHigherSpellPower = jsonSpell.atHigherSpellPower;
    return spell;
}