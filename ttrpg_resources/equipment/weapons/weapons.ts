import { DiceExpression } from "../../shared/Dice";
import { Cost, Equipment } from "../equipment";

export class Weapon extends Equipment {
    properties!: WeaponProperty[];
    damageDice!: DiceExpression;
    weaponType!: WeaponType;
    canAddStrToDamage!: boolean;

    getPrettyPropertiesString(): string {
        if (this.properties.length == 0) {
            return '-';
        } else {
            return this.properties.map(prop => prop.getPrettyString()).join(', ');
        }
    }
    
    getPrettyDamageString(): string {
        return this.damageDice.getPrettyString() + (this.canAddStrToDamage ? ' + [STR]' : '');
    }
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
            case "ammunition": return new WeaponProperty(WeaponPropertyType.AMMUNITION);
            case "armour-piercing": return new WeaponProperty(WeaponPropertyType.ARMOUR_PIERCING);
            case "heavy": return new WeaponProperty(WeaponPropertyType.HEAVY);
            case "lethal": return new WeaponProperty(WeaponPropertyType.LETHAL);
            case "light": return new WeaponProperty(WeaponPropertyType.LIGHT);
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
            case "versatile": {
                let argument = rawString.substring(rawString.indexOf("(") + 1, rawString.indexOf(")"));
                return new WeaponProperty(WeaponPropertyType.VERSATILE, argument, undefined);
            }
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
                return this.type.toString() + "(" + this.numberArgument + "/" + (this.numberArgument * 2) + "/" + (this.numberArgument * 4) + ")";
            case WeaponPropertyType.VERSATILE:
                return this.type.toString() + "(" + this.stringArgument + ")";
            default:
                return this.type.toString();
        }
    }

}

export enum WeaponPropertyType {
    AMMUNITION = "ammunition",
    ARMOUR_PIERCING = "armour-piercing",
    HEAVY = "heavy",
    LETHAL = "lethal",
    LIGHT = "light",
    LOADING = "loading",
    RANGED = "ranged",
    REACH = "reach",
    THROWN = "thrown",
    TWO_HANDED = "two-handed",
    VERSATILE = "versatile"
}

export enum WeaponType {
    MELEE = "Melee",
    RANGED = "Ranged"
}

import weaponsJson from './weapons.json';

type CombinedWeaponsJson = typeof weaponsJson.simpleWeapons[0] | typeof weaponsJson.advancedWeapons[0];

export const simpleWeapons: Weapon[] = weaponsJson.simpleWeapons.map(json => map(json));
export const advancedWeapons: Weapon[] = weaponsJson.advancedWeapons.map(json => map(json));

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
    weapon.damageDice = DiceExpression.of(weaponJson.damageDice);
    weapon.canAddStrToDamage = weaponJson.canAddStrToDamage;

    switch(weaponJson.weaponType.toLowerCase()) {
        case 'melee':
            weapon.weaponType = WeaponType.MELEE;
            break;
        case 'ranged':
            weapon.weaponType = WeaponType.RANGED;
            break;
        default:
            console.error('Unrecognized WeaponType: ' + weaponJson.weaponType);
    }

    return weapon;
}