import { Requirements } from "./AbilityRequirements";
import { TextElement, TextElementWithoutAbility } from "./TextElements";

export class Ability {
    name!: string;
    tags!: string[];
    requirements!: Requirements;
    cost!: string;
    range!: string;
    target!: string;
    duration!: string;
    description!: TextElementWithoutAbility[];
    flavorText!: TextElementWithoutAbility[];
}