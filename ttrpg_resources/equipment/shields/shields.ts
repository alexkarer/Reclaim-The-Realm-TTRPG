import { Cost, Equipment } from "../equipment";

export class Shield extends Equipment {
    shieldBlock?: number;
    damageThreshold?: number;
    manoeuvrePenalty!: number;
    movementPenalty!: number;
}

import shieldJson from './shields.json';

export const shields: Shield[] = shieldJson.map(json => map(json));

function map(jsonShield: typeof shieldJson[0]): Shield {
    let shield = new Shield();
    shield.name = jsonShield.name;
    shield.tier = jsonShield.tier;
    shield.craftingSkill = jsonShield.craftingSkill;
    shield.cost = Cost.of(jsonShield.cost);
    shield.weightInGram = jsonShield.weightInGram;
    shield.type = jsonShield.type;
    shield.description = jsonShield.description;
    shield.shieldBlock = jsonShield.shieldBlock;
    shield.damageThreshold = jsonShield.damageThreshold;
    shield.manoeuvrePenalty = jsonShield.manoeuvrePenalty;
    shield.movementPenalty = jsonShield.movementPenalty;

    return shield;
}
