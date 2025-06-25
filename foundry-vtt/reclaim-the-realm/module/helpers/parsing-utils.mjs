/**
 * Parsing Roll Data to determine type of roll
 * @param {string} rolldata
 * @returns {string} type of roll
 */
export function parseRollDataForType(rolldata) {
    let prefix = '';
    if (rolldata.includes('d20kh')) {
        prefix = 'ADVANTAGE ';
    } else if (rolldata.includes('d20kl')) {
        prefix = 'DISADVANTAGE ';
    }

    if (rolldata.includes('meleeMartialAttack')) {
        return prefix + 'MELEE MARTIAL ATTACK';
    } else if (rolldata.includes('rangedMartialAttack')) {
        return prefix + 'RANGED MARTIAL ATTACK';
    } else if (rolldata.includes('meleeSpellAttack')) {
        return prefix + 'MELEE SPELL ATTACK';
    } else if (rolldata.includes('rangedSpellAttack')) {
        return prefix + 'RANGED SPELL ATTACK';
    } else if (rolldata.includes('shieldBlock')) {
        return prefix + 'SHIELD BLOCK';
    } else if (rolldata.includes('willpowerSave')) {
        return prefix + 'WILLPOWER SAVE';
    } else if (rolldata.includes('toughnessSave')) {
        return prefix + 'TOUGHNESS SAVE';
    } else if (rolldata.includes('dodgeSave')) {
        return prefix + 'DODGE SAVE';
    } else if (rolldata.includes('stabilitySave')) {
        return prefix + 'STABILITY SAVE';
    } else if (rolldata.includes('martialTest')) {
        return prefix + _parseAttributeRoll(rolldata) + 'MARTIAL TEST';
    } else if (rolldata.includes('spellTest')) {
        return prefix + _parseAttributeRoll(rolldata) + 'SPELL TEST';
    } else if (rolldata.includes('skillTest')) {
        return prefix + _parseSkillTest(rolldata) + _parseAttributeRoll(rolldata) + 'SKILL TEST';
    } else if (rolldata.includes('attributeTest')) {
        return prefix + _parseAttributeRoll(rolldata) + 'ATTRIBUTE TEST';
    }
    return prefix + 'D20 TEST'
}

/**
 * Parsing Roll Data to determine containing attribute
 * @param {string} rolldata
 * @returns {string} attribute
 */
function _parseAttributeRoll(rolldata) {
    let attr = Object.entries(CONFIG.RTR.attributeAbbreviations).find(([k,v]) => rolldata.includes(k));
    if (attr) {
        return game.i18n.localize(attr[1]) + ' ';
    }
    return '';
}

/**
 * Parsing Roll Data to determine containing skill
 * @param {string} rolldata
 * @returns {string} skill
 */
function _parseSkillTest(rolldata) {
    let skill = Object.entries(CONFIG.RTR.skills).find(([k,v]) => rolldata.includes(k));
    if (skill) {
        return game.i18n.localize(skill[1]) + ' ';
    }
    return '';
}