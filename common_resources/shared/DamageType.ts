export enum DamageType {
    PHYSICAL = "Physical",
    FIRE = "Fire",
    FROST = "Frost",
    CORROSIVE = "Corrosive",
    SONIC = "Sonic",
    ELECTRIC = "Electric",
    POISON = "Poison",
    PSYCHIC = "Psychic",
    COSMIC = "Cosmic",
    HOLY = "Holy",
    UNHOLY = "Unholy"
}

export function stringToDamageType(stringDamageType: string): DamageType | undefined {
    switch(stringDamageType.toLowerCase()) {
        case DamageType.PHYSICAL.toLowerCase():
            return DamageType.PHYSICAL;
        case DamageType.FIRE.toLowerCase():
            return DamageType.FIRE;
        case DamageType.FROST.toLowerCase():
            return DamageType.FROST;
        case DamageType.SONIC.toLowerCase():
            return DamageType.SONIC;
        case DamageType.ELECTRIC.toLowerCase():
            return DamageType.ELECTRIC;
        case DamageType.PSYCHIC.toLowerCase():
            return DamageType.PSYCHIC;
        case DamageType.COSMIC.toLowerCase():
            return DamageType.COSMIC;
        case DamageType.HOLY.toLowerCase():
            return DamageType.HOLY;
        case DamageType.UNHOLY.toLowerCase():
            return DamageType.UNHOLY;
        default:
            console.error('Unkown Damage Type: ' + stringDamageType)
            return undefined;
    }
}