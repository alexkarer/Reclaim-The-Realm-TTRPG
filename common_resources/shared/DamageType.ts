export enum DamageType {
    PHYSICAL = "Physical",
    FIRE = "Fire",
    FROST = "Frost",
    CORROSIVE = "Corrosive",
    SONIC = "Sonic",
    ELECTRIC = "Electric",
    POISON = "Poison",
    PSYCHIC = "Psychic",
    HOLY = "Holy",
    UNHOLY = "Unholy",
    UNKNOWN = ""
}

export function parseDamageType(s: string): DamageType {
    switch(s.toLowerCase()) {
        case "":
            return DamageType.UNKNOWN;
        case DamageType.PHYSICAL.toLowerCase():
            return DamageType.PHYSICAL;
        case DamageType.FIRE.toLowerCase():
            return DamageType.FIRE;
        case DamageType.FROST.toLowerCase():
            return DamageType.FROST;
        case DamageType.CORROSIVE.toLowerCase():
            return DamageType.CORROSIVE;
        case DamageType.SONIC.toLowerCase():
            return DamageType.SONIC;
        case DamageType.ELECTRIC.toLowerCase():
            return DamageType.ELECTRIC;
        case DamageType.POISON.toLowerCase():
            return DamageType.POISON;
        case DamageType.PSYCHIC.toLowerCase():
            return DamageType.PSYCHIC;
        case DamageType.HOLY.toLowerCase():
            return DamageType.HOLY;
        case DamageType.UNHOLY.toLowerCase():
            return DamageType.UNHOLY;
        default:
            console.warn('Unkown Damage Type: ' + s)
            return DamageType.UNKNOWN;
    }
}