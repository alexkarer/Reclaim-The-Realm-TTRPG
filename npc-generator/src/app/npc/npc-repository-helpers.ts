import { NPC } from './npc';
import martialDamageJson from '../../../../common_resources/character_values/core_values.json';

export function calcualteNPCCreationPoints(state: NPC): number {
    let npcCreationPoints = 0;
    if (state.levelConfig.level === 0.25) {
        npcCreationPoints = state.archeTypeProgression.npcCreatuinPoints.npcCreationPointsQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        npcCreationPoints = state.archeTypeProgression.npcCreatuinPoints.npcCreationPointsHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        npcCreationPoints = state.archeTypeProgression.npcCreatuinPoints.npcCreationPointsBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.npcCreatuinPoints.npcCreationPointsFactor);
    }
    return npcCreationPoints;
}

export function calculateMartialLevel(state: NPC): number {
    return Math.floor(state.levelConfig.level * state.archeTypeProgression.levels.martialLevelFactor); 
}

export function calculateSpellLevel(state: NPC): number {
    return Math.floor(state.levelConfig.level * state.archeTypeProgression.levels.spellLevelFactor); 
}

export function calculateStr(state: NPC): number {
    let strBase = 0;
    if (state.levelConfig.level === 0.25) {
        strBase = state.archeTypeProgression.attributes.strQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        strBase = state.archeTypeProgression.attributes.strHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        strBase = state.archeTypeProgression.attributes.strBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.strFactor);
    }

    return state.strBonus +
        strBase +
        state.creatureType.attributeBonsuses.str +
        state.creatureSubType.attributeBonsuses.str +
        state.creatureSize.strBonus +
        state.strAttributeBoost;
}

export function calculateAgi(state: NPC): number {
    let agiBase = 0;
    if (state.levelConfig.level === 0.25) {
        agiBase = state.archeTypeProgression.attributes.agiQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        agiBase = state.archeTypeProgression.attributes.agiHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        agiBase = state.archeTypeProgression.attributes.agiBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.agiFactor);
    }

    return state.agiBonus +
        agiBase +
        state.creatureType.attributeBonsuses.agi +
        state.creatureSubType.attributeBonsuses.agi +
        state.agiAttributeBoost;
}

export function calculateCon(state: NPC): number {
    let conBase = 0;
    if (state.levelConfig.level === 0.25) {
        conBase = state.archeTypeProgression.attributes.conQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        conBase = state.archeTypeProgression.attributes.conHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        conBase = state.archeTypeProgression.attributes.conBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.conFactor);
    }

    return state.conBonus +
        conBase +
        state.creatureType.attributeBonsuses.con +
        state.creatureSubType.attributeBonsuses.con +
        state.conAttributeBoost;
}

export function calculateInt(state: NPC): number {
    let intBase = 0;
    if (state.levelConfig.level === 0.25) {
        intBase = state.archeTypeProgression.attributes.intQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        intBase = state.archeTypeProgression.attributes.intHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        intBase = state.archeTypeProgression.attributes.intBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.intFactor);
    }

    return state.intBonus +
        intBase +
        state.creatureType.attributeBonsuses.int +
        state.creatureSubType.attributeBonsuses.int +
        state.intAttributeBoost;
}

export function calculateSpi(state: NPC): number {
    let spiBase = 0;
    if (state.levelConfig.level === 0.25) {
        spiBase = state.archeTypeProgression.attributes.spiQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        spiBase = state.archeTypeProgression.attributes.spiHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        spiBase = state.archeTypeProgression.attributes.spiBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.spiFactor);
    }

    return state.spiBonus +
        spiBase +
        state.creatureType.attributeBonsuses.spi +
        state.creatureSubType.attributeBonsuses.spi +
        state.spiAttributeBoost;
}

export function calculatePer(state: NPC): number {
    let perBase = 0;
    if (state.levelConfig.level === 0.25) {
        perBase = state.archeTypeProgression.attributes.perQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        perBase = state.archeTypeProgression.attributes.perHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        perBase = state.archeTypeProgression.attributes.perBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.perFactor);
    }

    return state.perBonus + 
        perBase +
        state.creatureType.attributeBonsuses.per +
        state.creatureSubType.attributeBonsuses.per +
        state.perAttributeBoost;
}

export function calculateCha(state: NPC): number {
    let chaBase = 0;
    if (state.levelConfig.level === 0.25) {
        chaBase = state.archeTypeProgression.attributes.chaQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        chaBase = state.archeTypeProgression.attributes.chaHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        chaBase = state.archeTypeProgression.attributes.chaBase + Math.floor(state.levelConfig.level * state.archeTypeProgression.attributes.chaFactor);
    }

    return state.chaBonus +
        chaBase +
        state.creatureType.attributeBonsuses.cha +
        state.creatureSubType.attributeBonsuses.cha +
        state.chaAttributeBoost;
}

export function calculateHp(state: NPC): number {
    let hp = 0;
    if (state.levelConfig.level === 0.25) {
        hp = state.archeTypeProgression.hp.hpQuarterLevel;
    } else if (state.levelConfig.level === 0.5) {
        hp = state.archeTypeProgression.hp.hpHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        hp = state.archeTypeProgression.hp.baseHp + state.levelConfig.level * 
            (state.archeTypeProgression.hp.hpFactor + state.creatureSize.hpPerLevelBonus +  state.hpPerLevelBonuses + Math.floor(calculateCon(state) / 2));
    }
    return hp;
}

export function calculateStability(state: NPC): number {
    let stabilityBase = 0;
    if (state.levelConfig.level === 0.25 || state.levelConfig.level === 0.5) {
        stabilityBase = state.archeTypeProgression.defenses.stabilityQuaterOrHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        stabilityBase = Math.floor(state.archeTypeProgression.defenses.stabilityFactor * state.levelConfig.level);
    }
    return 10 + stabilityBase + calculateStr(state) + state.stabilityBonus;
}

export function calculateDodge(state: NPC): number {
    let dodgeBase = 0;
    if (state.levelConfig.level === 0.25 || state.levelConfig.level === 0.5) {
        dodgeBase = state.archeTypeProgression.defenses.dodgeQuaterOrHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        dodgeBase = Math.floor(state.archeTypeProgression.defenses.dodgeFactor * state.levelConfig.level);
    }
    return 10 + dodgeBase + calculateAgi(state) + state.dodgeBonus + state.creatureSize.dodgeBonus;
}

export function calculateToughness(state: NPC): number {
    let toughnessBase = 0;
    if (state.levelConfig.level === 0.25 || state.levelConfig.level === 0.5) {
        toughnessBase = state.archeTypeProgression.defenses.toughnessQuaterOrHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        toughnessBase = Math.floor(state.archeTypeProgression.defenses.toughnessFactor * state.levelConfig.level);
    }
    return 10 + toughnessBase + calculateCon(state) + state.toughnessBonus;
}

export function calculateWillpower(state: NPC): number {
    let willpowerBase = 0;
    if (state.levelConfig.level === 0.25 || state.levelConfig.level === 0.5) {
        willpowerBase = state.archeTypeProgression.defenses.willpowerQuaterOrHalfLevel;
    } else if (state.levelConfig.level >= 1) {
        willpowerBase = Math.floor(state.archeTypeProgression.defenses.willpowerFactor * state.levelConfig.level);
    }
    return 10 + willpowerBase + calculateSpi(state) + state.willpowerBonus;
}

export function flattenDamageResistances(state: NPC): string {
    return [...state.creatureType.damageResistances, ...state.additionalResistances]
        .map(dmgR => dmgR.type + ' ' + dmgR.value)
        .map(str => str.replaceAll('[LEVEL]', Math.ceil(state.levelConfig.level).toString()))
        .map(str => str.replaceAll('[HALF LEVEL]', Math.floor(state.levelConfig.level / 2).toString()))
        .sort((s1, s2) => s1.localeCompare(s2))
        .join(', ');
}

export function getLightDamage(str: number): string {
    return martialDamageJson.martialDamage.martialDamageTable.find(mdmg => mdmg.str === str)?.light ?? '';
}

export function multiplyD6DiceExpressions(diceExpr: string, factor: number = 1) {
    if (diceExpr.charAt(0) == 'd') {
        if (diceExpr.length > 2 && diceExpr.charAt(2) == '+') {
            let constant = parseInt(diceExpr.substring(3, diceExpr.length));
            return factor.toString() + 'd6+' + (constant * factor).toString();
        } else {
            return factor.toString() + 'd6';
        }
    } else {
        let diceStartIndex = diceExpr.indexOf('d');
        let diceAmount = parseInt(diceExpr.substring(0, diceStartIndex));
        if (diceExpr.length > (diceStartIndex+2) && diceExpr.charAt(diceStartIndex+2) == '+') {
            let constant = parseInt(diceExpr.substring(diceStartIndex+3, diceExpr.length));
            return (diceAmount * factor).toString() + 'd6+' + (constant * factor).toString();
        } else {
            return (diceAmount * factor).toString() + 'd6';
        }
    }
}