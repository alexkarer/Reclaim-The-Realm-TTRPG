import { DamageType, stringToDamageType } from "../../shared/DamageType";
import { Cost, Equipment } from "../equipment";

export class Armour extends Equipment {
    damageBlock?: {amount: number, type: DamageType};
    manoeuvrePenalty!: number;
    movementPenalty!: number;
}

import armorJson from './armour.json';

export const armours: Armour[] = armorJson.map(json => map(json));

function map(jsonArmor: typeof armorJson[0]): Armour {
    let armor = new Armour();
    armor.name = jsonArmor.name;
    armor.tier = jsonArmor.tier;
    armor.craftingSkill = jsonArmor.craftingSkill;
    armor.cost = Cost.of(jsonArmor.cost);
    armor.weightInGram = jsonArmor.weightInGram;
    armor.type = jsonArmor.type;
    armor.description = jsonArmor.description;
    armor.manoeuvrePenalty = jsonArmor.manoeuvrePenalty;
    armor.movementPenalty = jsonArmor.movementPenalty;
    armor.damageBlock = parseDamageBlock(jsonArmor.damageBlock);

    return armor;
}

function parseDamageBlock(rawDamageBlock: string): {amount: number, type: DamageType} | undefined {
    let amountAndDamageType = rawDamageBlock.split(" ");
    let damageBlockAmount = Number.parseInt(amountAndDamageType[0]);
    let damageBlockDamageType = stringToDamageType(amountAndDamageType[1]);
    if (!damageBlockDamageType) {
        return undefined;
    }

    return {
        amount: damageBlockAmount,
        type: damageBlockDamageType
    }
}