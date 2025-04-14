export type Requirements = {
    requiredLevels: LevelRequirement[];
    requiredAttributes: AttributeRequirement[];
    requiredPerks: string[];
    otherRequirements: string[];
};

export type AttributeRequirement = {
    amount: number;
    attribute: string;
}

export type LevelRequirement = {
    amount: number;
    levelType: string;
}