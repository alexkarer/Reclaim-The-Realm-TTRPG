import { Requirements } from '../globals/AbilityRequirements';

export type Perk = {
    name: String;
    type: PerkType;
    requirements: Requirements;
    repeatable: boolean;
    description: string;
}

export enum PerkType {
    CRAFTING,
    DEFENSIVE,
    MARTIAL,
    SKILL,
    SPELLCASTING,
    OTHER
}