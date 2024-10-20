import barbarianJson from './barbarian.json';
import clericJson from './cleric.json';
import fighterJson from './fighter.json';
import rogueJson from './rogue.json';
import sorcererJson from './sorcerer.json';
import warlockJson from './warlock.json';

export type PlayerClass = typeof barbarianJson | typeof clericJson | typeof fighterJson | typeof rogueJson | typeof sorcererJson | typeof warlockJson;

export const playerClasses: PlayerClass[] = [
    barbarianJson,
    clericJson,
    fighterJson,
    rogueJson,
    sorcererJson,
    warlockJson
];