import { Ability } from '../shared/Ability';
import { TextElement } from '../shared/TextElements';
import barbarianJson from './barbarian.json';
import priestJson from './priest.json';
import fighterJson from './fighter.json';
import rogueJson from './rogue.json';
import mageJson from './mage.json';
import warlockJson from './warlock.json';

export type PlayerClassJson = typeof barbarianJson | typeof priestJson | typeof fighterJson | typeof rogueJson | typeof mageJson | typeof warlockJson;

type CoreClassValues = typeof barbarianJson.coreClassValues | typeof priestJson.coreClassValues | typeof fighterJson.coreClassValues | typeof rogueJson.coreClassValues | typeof mageJson.coreClassValues | typeof warlockJson.coreClassValues;

type ClassTechnique = typeof barbarianJson.classTechniques[0] | typeof priestJson.classTechniques[0] | typeof fighterJson.classTechniques[0] | typeof rogueJson.classTechniques[0] | typeof mageJson.classTechniques[0] | typeof warlockJson.classTechniques[0];

export class PlayerClass {
    className!: string;
    classDescription!: string;
    coreClassValues!: CoreClassValues;
    classCoreFeature!: {
        name: string;
        textElements: TextElement[];
    };
    classTechniquesDescription!: string;
    classTechniques!: Ability[];
}

function mapPlayerClass(jsonClass: PlayerClassJson): PlayerClass {
    let playerClass = new PlayerClass();
    playerClass.className = jsonClass.className;
    playerClass.classDescription = jsonClass.classDescription;
    playerClass.coreClassValues = jsonClass.coreClassValues;

    playerClass.classCoreFeature = {
        name: jsonClass.classCoreFeature.name,
        textElements: jsonClass.classCoreFeature.textElements
    };

    playerClass.classTechniquesDescription = jsonClass.classTechniquesDescription;
    playerClass.classTechniques = jsonClass.classTechniques.map(json => mapClassTechnique(json));

    return playerClass;
}

function mapClassTechnique(jsonTechnique: ClassTechnique): Ability {
    let classTechnique = new Ability();
    classTechnique.name = jsonTechnique.name;
    classTechnique.tags = jsonTechnique.tags;
    classTechnique.requirements = jsonTechnique.requirements;
    classTechnique.cost = jsonTechnique.cost;
    classTechnique.range = jsonTechnique.range;
    classTechnique.target = jsonTechnique.target;
    classTechnique.duration = jsonTechnique.duration;
    classTechnique.description = jsonTechnique.description;
    return classTechnique;
}

export const playerClasses: PlayerClass[] = [
    mapPlayerClass(barbarianJson),
    mapPlayerClass(priestJson),
    mapPlayerClass(fighterJson),
    mapPlayerClass(rogueJson),
    mapPlayerClass(mageJson),
    mapPlayerClass(warlockJson)
];

