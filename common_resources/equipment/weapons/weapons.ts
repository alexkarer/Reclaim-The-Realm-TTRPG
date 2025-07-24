import { Cost, Equipment } from "../equipment";

export class Weapon extends Equipment {
}

export class Ammunition extends Equipment {
    availibleWeapons!: string;
    recoverable!: boolean;
}

import weaponsJson from './weapons.json';
import ammunitionsJson from './ammunitions.json';

type WeaponsJson = typeof weaponsJson[0];

export const weapons: Weapon[] = weaponsJson.map(json => map(json));
export const ammunitions: Ammunition[] = ammunitionsJson.ammunitions.map(json => mapAmmunition(json));

function map(weaponJson: WeaponsJson): Weapon {
    let weapon = new Weapon();
    weapon.name = weaponJson.name;
    weapon.tier = weaponJson.tier;
    weapon.craftingSkill = weaponJson.craftingSkill;
    weapon.cost = Cost.of(weaponJson.cost);
    weapon.weightInGram = weaponJson.weightInGram;
    weapon.type = weaponJson.type;
    weapon.description = weaponJson.description;

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