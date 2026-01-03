import { DamageType, parseDamageType } from "../../shared/DamageType";
import { TextElementWithoutAbility } from "../../shared/TextElements";
import { mapIconPath } from "../../shared/icons";
import weaponsJson from "./weapons.json";
import armourJson from "./armour.json";

export class Equipment {
    name!: string;
    tags!: string[];
    meta!: {
        iconPath: string,
        colour: EquipmentColour
    }
    tier!: number;
    craftingSkill!: string;
    cost!: {
        amount: number,
        currency: Currency
    };
    weightInGram!: number;
    description!: TextElementWithoutAbility[];
    grantedAbilities!: string[];

    getPrettyWeightString(): string {
        if (this.weightInGram <= 0) {
            return '-';
        } else if (this.weightInGram < 100) {
            return this.weightInGram + ' g';
        } else {
            return Math.round(this.weightInGram * 10) / 10000 + ' kg';
        }
    }
}

export class Armour extends Equipment {
    armourStats!: {
        damageBlock: DamageBlock[],
        dodgePenalty: number,
        mpPenalty: number
    }
}

export enum EquipmentColour { COLOURLESS }
export enum Currency { BC = "bc", SC = "sc", GC = "gc", NONE = "-" }
export type DamageBlock = {
    amount: number,
    type: DamageType
};

export const EQUIPMENT: Equipment[] = [
    ...weaponsJson.map(w => map(w)),
    ...armourJson.map(a => mapArmour(a))
]

type JsonEquipment = typeof weaponsJson[0];
function map(jsonEquipment: JsonEquipment): Equipment {
    let equipment = new Equipment();
    equipment.name = jsonEquipment.name;
    equipment.tags = jsonEquipment.tags;
    equipment.meta = {
        iconPath: mapIconPath(jsonEquipment.meta.iconPath),
        colour: mapColour(jsonEquipment.meta.colour)
    }
    equipment.tier = jsonEquipment.tier;
    equipment.craftingSkill = jsonEquipment.craftingSkill;
    equipment.cost = {
        amount: jsonEquipment.cost.amount,
        currency: mapCost(jsonEquipment.cost.currency)
    }
    equipment.weightInGram = jsonEquipment.weightInGram;
    equipment.description = jsonEquipment.description;
    equipment.grantedAbilities = jsonEquipment.grantedAbilities;
    return equipment;
}

type JsonArmour = typeof armourJson[0];
function mapArmour(jsonArmour: JsonArmour): Armour {
    let armour = new Armour();
    armour.name = jsonArmour.name;
    armour.tags = jsonArmour.tags;
    armour.meta = {
        iconPath: mapIconPath(jsonArmour.meta.iconPath),
        colour: mapColour(jsonArmour.meta.colour)
    }
    armour.tier = jsonArmour.tier;
    armour.craftingSkill = jsonArmour.craftingSkill;
    armour.cost = {
        amount: jsonArmour.cost.amount,
        currency: mapCost(jsonArmour.cost.currency)
    }
    armour.weightInGram = jsonArmour.weightInGram;
    armour.description = jsonArmour.description;
    armour.grantedAbilities = jsonArmour.grantedAbilities;
    armour.armourStats = {
        damageBlock: jsonArmour.armourStats.damageBlock.map(dmgblock => { return { amount: dmgblock.amount, type: parseDamageType(dmgblock.type)} }),
        dodgePenalty: jsonArmour.armourStats.dodgePenalty,
        mpPenalty: jsonArmour.armourStats.mpPenalty
    }
    return armour;
}

function mapColour(s: string): EquipmentColour {
    switch(s) {
        case 'COLOURLESS': return EquipmentColour.COLOURLESS;
        default: console.error(`Unkown EquipmentColour ${s}, setting COLOURLESS`); return EquipmentColour.COLOURLESS;
    }
}

function mapCost(s: string): Currency {
    switch(s) {
        case 'BC': return Currency.BC;
        case 'SC': return Currency.SC;
        case 'GC': return Currency.GC;
        case 'NONE': return Currency.NONE;
        default: console.error(`Unkown Currency ${s}, setting NONE`); return Currency.NONE;
    }
}
