import { Ability } from "../../shared/Ability";

export class Spell extends Ability {
    components!: {
        verbal?: string;
        somatic?: string;
        material?: string;
    };
    castingDifficulty!: number;
    upcast!: {
        mana: number;
        effect: string;
    };
}
