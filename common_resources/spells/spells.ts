import { Ability } from '../shared/Ability';

import JsonSpellList from './spells.json'

type JsonSpells = typeof JsonSpellList;
type JsonSpell = typeof JsonSpellList.elementalSpells.pyromancySpells[0];

export class Spell extends Ability {
    components?: string
    spellDifficulty?: number
    upCastingTheSpell?: string
}

export type SpellCollection = {
    elementalSpells: Spell[],
    cosmicSpells: Spell[],
    manipulationSpells: Spell[]
}

export const allSpells = [...mapToSpellCollection(JsonSpellList).elementalSpells, ...mapToSpellCollection(JsonSpellList).cosmicSpells, ...mapToSpellCollection(JsonSpellList).manipulationSpells];

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
    spell.spellDifficulty = jsonSpell.spellDifficulty;
    spell.upCastingTheSpell = jsonSpell.upCastingTheSpell;
    return spell;
}