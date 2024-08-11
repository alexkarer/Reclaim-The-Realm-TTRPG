import { Attribute } from "../character_values/attributes/attribute";
import { LevelType } from "../keywords/levels";

export type Requirements = {
    requiredLevels: LevelRequirement[];
    requiredAttributes: AttributeRequirement[];
    requiredPerks: String[];
    otherRequirements: String[];
};

export type AttributeRequirement = {
    amount: number;
    attribute: Attribute;
}

export type LevelRequirement = {
    amount: number;
    levelType: LevelType;
}