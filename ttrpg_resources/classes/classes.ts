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
    classPathDescription!: string;
    classCoreFeature!: {
        name: string;
        textElements: TextElement[];
    };
    classPaths!: [
        {
            name: string;
            textElements: TextElement[];
        }
    ];
    classFeatures!: [
        {
            name: string;
            levels: number[];
            relatedClassPath: string | null;
            textElements: TextElement[];
        }
    ];
    classTechniquesDescription!: string;
    classTechniques!: Ability[];
}

function mapPlayerClass(jsonClass: PlayerClassJson): PlayerClass {
    let playerClass = new PlayerClass();
    playerClass.className = jsonClass.className;
    playerClass.classDescription = jsonClass.classDescription;
    playerClass.coreClassValues = jsonClass.coreClassValues;
    playerClass.classPathDescription = jsonClass.classPathDescription;

    playerClass.classCoreFeature = {
        name: jsonClass.classCoreFeature.name,
        textElements: jsonClass.classCoreFeature.textElements
    };

    playerClass.classPaths = [jsonClass.classPaths[0]]
    for (let i = 1; i < jsonClass.classPaths.length; i++) {
        playerClass.classPaths.push(jsonClass.classPaths[i])
    }

    playerClass.classFeatures = [{
            name: jsonClass.classFeatures[0].name,
            levels: jsonClass.classFeatures[0].levels,
            relatedClassPath: jsonClass.classFeatures[0].relatedClassPath,
            textElements: jsonClass.classFeatures[0].textElements
    }];
    for (let i = 1; i < jsonClass.classFeatures.length; i++) {
        playerClass.classFeatures.push({
                name: jsonClass.classFeatures[i].name,
                levels: jsonClass.classFeatures[i].levels,
                relatedClassPath: jsonClass.classFeatures[i].relatedClassPath,
                textElements: jsonClass.classFeatures[i].textElements
        });
    }

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

