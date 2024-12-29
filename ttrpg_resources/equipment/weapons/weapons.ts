import { Cost, Equipment } from "../equipment";

export class Weapon extends Equipment {
    properties!: WeaponProperty[];
    damage!: string ;

    getPrettyPropertiesString(): string {
        if (this.properties.length == 0) {
            return '-';
        } else {
            return this.properties.map(prop => prop.getPrettyString()).join(', ');
        }
    }
    
    getPrettyDamageString(): string {
        return this.damage
    }
}

export class Ammunition extends Equipment {
    availibleWeapons!: string;
    recoverable!: boolean;
}

export class WeaponProperty {
    type!: WeaponPropertyType;
    stringArgument!: string;
    numberArgument!: number;

    private constructor(type: WeaponPropertyType, stringArgument: string | undefined = undefined, numberArgument: number | undefined = undefined) {
        this.type = type;
        if (stringArgument) this.stringArgument = stringArgument;
        if (numberArgument) this.numberArgument = numberArgument;
    }

    static of(rawString: string): WeaponProperty | undefined {
        let propertyNameEndIndex = (rawString.indexOf("(") !== -1) ? rawString.indexOf("(") : rawString.length;
        let rawWeaponPropertyString = rawString.substring(0, propertyNameEndIndex);
        switch(rawWeaponPropertyString) {
            case "armour-piercing": return new WeaponProperty(WeaponPropertyType.ARMOUR_PIERCING);
            case "shieldbreaker": return new WeaponProperty(WeaponPropertyType.SHIELDBREAKER);
            case "duelist": return new WeaponProperty(WeaponPropertyType.DUELIST);
            case "heavy": return new WeaponProperty(WeaponPropertyType.HEAVY);
            case "lethal": return new WeaponProperty(WeaponPropertyType.LETHAL);
            case "light": return new WeaponProperty(WeaponPropertyType.LIGHT);
            case "versatile": return new WeaponProperty(WeaponPropertyType.VERSATILE);
            case "loading": {
                let rawNumberArgument = rawString.substring(rawString.indexOf("(") + 1, rawString.indexOf(","));
                let numberArgument = Number.parseInt(rawNumberArgument);
                let rawStringArgument = rawString.substring(rawString.indexOf(",") + 1, rawString.indexOf(")"));
                return new WeaponProperty(WeaponPropertyType.LOADING, rawStringArgument, numberArgument);
            }
            case "ranged": {
                let argument = rawString.substring(rawString.indexOf("(") + 1, rawString.indexOf("/"));
                let numberArgument = Number.parseFloat(argument);
                return new WeaponProperty(WeaponPropertyType.RANGED, undefined, numberArgument);
            }
            case "reach": return new WeaponProperty(WeaponPropertyType.REACH);
            case "thrown": {
                let argument = rawString.substring(rawString.indexOf("(") + 1, rawString.indexOf("/"));
                let numberArgument = Number.parseFloat(argument);
                return new WeaponProperty(WeaponPropertyType.THROWN, undefined, numberArgument);
            }
            case "two-handed": return new WeaponProperty(WeaponPropertyType.TWO_HANDED);
            default: return undefined;
        }
    }

    getPrettyString(): string {
        switch(this.type) {
            case WeaponPropertyType.LOADING:
                return this.type.toString() + "(" + this.numberArgument + ", " + this.stringArgument + ")";
            case WeaponPropertyType.RANGED:
                return this.type .toString()+ "(" + this.numberArgument + "/" + (this.numberArgument * 2) + "/" + (this.numberArgument * 4) + ")";
            case WeaponPropertyType.THROWN:
                return this.type.toString() + "(" + this.numberArgument + "/" + (this.numberArgument * 2) + "/" + (this.numberArgument * 4) + ")";;
            default:
                return this.type.toString();
        }
    }

}

export enum WeaponPropertyType {
    ARMOUR_PIERCING = "armour-piercing",
    HEAVY = "heavy",
    LETHAL = "lethal",
    LIGHT = "light",
    LOADING = "loading",
    RANGED = "ranged",
    REACH = "reach",
    THROWN = "thrown",
    TWO_HANDED = "two-handed",
    VERSATILE = "versatile",
    SHIELDBREAKER = "shieldbreaker",
    DUELIST = "duelist"
}

export enum WeaponType {
    MELEE = "Melee",
    RANGED = "Ranged"
}

import weaponsJson from './weapons.json';
import ammunitionsJson from './ammunitions.json';

type CombinedWeaponsJson = typeof weaponsJson.simpleWeapons[0] | typeof weaponsJson.advancedWeapons[0];

export const simpleWeapons: Weapon[] = weaponsJson.simpleWeapons.map(json => map(json));
export const advancedWeapons: Weapon[] = weaponsJson.advancedWeapons.map(json => map(json));
export const ammunitions: Ammunition[] = ammunitionsJson.ammunitions.map(json => mapAmmunition(json));

function map(weaponJson: CombinedWeaponsJson): Weapon {
    let weapon = new Weapon();
    weapon.name = weaponJson.name;
    weapon.tier = weaponJson.tier;
    weapon.craftingSkill = weaponJson.craftingSkill;
    weapon.cost = Cost.of(weaponJson.cost);
    weapon.weightInGram = weaponJson.weightInGram;
    weapon.type = weaponJson.type;
    weapon.description = weaponJson.description;
    weapon.properties = weaponJson.properties.map(json => WeaponProperty.of(json)).filter(json => json !== undefined);
    weapon.damage = weaponJson.damage;

    return weapon;
}

function mapAmmunition(ammunitionJson: typeof ammunitionsJson.ammunitions[0]): Ammunition {
    let ammunition = new Ammunition();
    ammunition.name = ammunitionJson.name;
    ammunition.tier = ammunitionJson.tier;
    ammunition.craftingSkill = ammunitionJson.craftingSkill;
    ammunition.cost = Cost.of(ammunitionJson.cost);
    ammunition.weightInGram = ammunitionJson.weightInGram;
    ammunition.type = ammunitionJson.type;
    ammunition.description = ammunitionJson.description;
    ammunition.availibleWeapons = ammunitionJson.availibleWeapons;
    ammunition.recoverable = ammunitionJson.recoverable;

    return ammunition;
}