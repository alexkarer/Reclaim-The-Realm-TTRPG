import { Requirements } from "./AbilityRequirements";

export class Ability {
    name!: string;
    tags!: string[];
    requirements!: Requirements;
    cost!: string;
    range!: string;
    target!: string;
    duration!: string;
    description!: string;
}