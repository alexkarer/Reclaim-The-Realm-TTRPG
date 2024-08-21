import { Pipe, PipeTransform } from "@angular/core";
import { Attribute, attributes } from '../../../../ttrpg_resources/character_values/attributes/attribute';

@Pipe({
    name: 'keywordProcessor',
    standalone: true,
})
export class KeywordProcessorPipe implements PipeTransform {
    transform(text: string | undefined): ContentPart[] {
        if (!text) {
            return [];
        }
        let processedText = processKeywords(text);
        return processedText;
    }
}

function processKeywords(text: string): ContentPart[] {
    if (text.indexOf('[') === -1) {
        return [{type: 'text', text: text}];
    }

    let parts: ContentPart[] = [];
    let lastKeywordIndex = 0;
    while (text.indexOf('[', lastKeywordIndex) !== -1) {
        let keywordIndex = text.indexOf('[', lastKeywordIndex);
        let textBeforeKeyword = text.substring(lastKeywordIndex, keywordIndex);

        if (textBeforeKeyword.length !== 0) {
            parts.push({type: 'text', text: textBeforeKeyword});
        }

        let fullKeyword = text.substring(keywordIndex + 1, text.indexOf(']', keywordIndex))

        switch(fullKeyword) {
            // ********************** ATTRIBUTES **********************
            case 'STR':
                parts.push(generateAttributeKeyword(attributes[0]));
                break;
            case 'AGI':
                parts.push(generateAttributeKeyword(attributes[1]));
                break;
            case 'CON':
                parts.push(generateAttributeKeyword(attributes[2]));
                break;
            case 'INT':
                parts.push(generateAttributeKeyword(attributes[3]));
                break;
            case 'SPI':
                parts.push(generateAttributeKeyword(attributes[4]));
                break;
            case 'PER':
                parts.push(generateAttributeKeyword(attributes[5]));
                break;
            case 'CHA':
                parts.push(generateAttributeKeyword(attributes[6]));
                break;
            // ********************** MECHANICS **********************
            case 'D20 TEST':
                parts.push(generateGenericKeyword('[D20 TEST]', 'On a d20 Test you roll a d20 dice and most of a time add a number to the result which decreases or increases the result which is made against some Difficulty Threshold [DT] that has to be exceeded.', 'd20-test'));
                break;
            case 'DT':
                parts.push(generateGenericKeyword('[DT]', 'The difficulty of any [D20 TEST] is measured by the Difficulty Threshld ([DT]). The [DT] should be exlusivly based upon the difficulty of the action the actor attempts.', 'dt'));
                break;
            case 'ADVANTAGE':
                parts.push(generateGenericKeyword('[ADVANTAGE]', 'When you make a [D20 TEST] you roll the d20 twice and take the better result.', 'adv-disadv'));
                break;
            case 'DISADVANTAGE':
                parts.push(generateGenericKeyword('[DISADVANTAGE]', 'When you make a [D20 TEST] you roll the d20 twice and take the worse result.', 'adv-disadv'));
                break;
            case 'ATTRIBUTE TEST':
                parts.push(generateGenericKeyword('[ATTRIBUTE TEST]', 'An [ATTRIBUTE TEST] is a [D20 TEST] to determine if you can succeed in a certain activity related to a specific Attribute. Simply roll a d20 and add the related Attribute.', 'attribute-test'));
                break;
            case 'SKILL TEST':
                parts.push(generateGenericKeyword('[SKILL TEST]', 'A Skill Test is an [ATTRIBUTE TEST] where also ranks of a Skill can be added to the bonus.', ''));
                break;
            case 'ATTACK':
                parts.push(generateGenericKeyword('[ATTACK]', 'TODO', ''));
                break;
            case 'MELEE ATTACK':
                parts.push(generateGenericKeyword('[MELEE ATTACK]', 'TODO', ''));
                break;
            case 'RANGED ATTACK':
                parts.push(generateGenericKeyword('[RANGED ATTACK]', 'TODO', ''));
                break;
            case 'MARTIAL TEST':
                parts.push(generateGenericKeyword('[MARTIAL TEST]', 'TODO', ''));
                break;
            case 'MELEE MARTIAL ATTACK':
                parts.push(generateGenericKeyword('[MARTIAL MEELE ATTACK]', 'TODO', ''));
                break;
            case 'RANGED MARTIAL ATTACK':
                parts.push(generateGenericKeyword('[RANGED MARTIAL ATTACK]', 'TODO', ''));
                break;
            case 'SPELL TEST':
                parts.push(generateGenericKeyword('[SPELL TEST]', 'TODO', ''));
                break;
            case 'MELEE SPELL ATTACK':
                parts.push(generateGenericKeyword('[MELEE SPELL ATTACK]', 'TODO', ''));
                break;
            case 'RANGED SPELL ATTACK':
                parts.push(generateGenericKeyword('[RANGED SPELL ATTACK]', 'TODO', ''));
                break;
            case 'CONCENTRATION TEST':
                parts.push(generateGenericKeyword('[CONCENTRATION TEST]', 'TODO', ''));
                break;
            case 'SAVE':
                parts.push(generateGenericKeyword('[SAVE]', 'TODO', 'save'));
                break;
            // ********************** CHARACTER VALUES **********************
            case 'LEVEL':
                parts.push(generateGenericKeyword('[LEVEL]', 'Your characters current [LEVEL], it increases as your character spends time adventuring and earns [XP]. When your [LEVEL] increases your characters statistics also improve in several ways.', 'level'));
                break;
            case 'MARTIAL LEVEL':
                parts.push(generateGenericKeyword('[MARTIAL LEVEL]', 'Your Characters[MARTIAL LEVEL] is calculated by multiplying the Martial Level Progression of your Class with your [LEVEL] and rounding down.', 'martial-level'));
                break;
            case 'SPELL LEVEL':
                parts.push(generateGenericKeyword('[SPELL LEVEL]', 'Your Characters [SPELLCASTING LEVEL] is calculated by multiplying the Spellcasting Level Progression of your Class with your [LEVEL] and rounding down.', 'spell-level'));
                break;
            case 'HP':
                parts.push(generateGenericKeyword('[HP]', 'Health Points. Represents how much damage you can take before going unconcious.', 'hp'));
                break;
            case 'THP':
                parts.push(generateGenericKeyword('[THP]', 'Temporary health points. They are a buffer against damage, a pool of hit points that protect you from injury.', 'thp'));
                break;
            case 'STAMINA':
                parts.push(generateGenericKeyword('[STAMINA]', '[STAMINA] is your energy reserve with which you can replenish your Resources like HP and Aether and is used up when performing physically demanding tasks.', 'stamina'));
                break;
            case 'ARCANA':
                parts.push(generateGenericKeyword('[ARCANA]', 'Your [ARCANA] represents an energy reserve you expend when drawing power from the elemental planes and the aether to cast spells.', 'arcana'));
                break;
            case 'HARDNESS':
                parts.push(generateGenericKeyword('[HARDNESS]', 'A representation of the characters resistance against being forcefully moved or crushed against their will. Increases with your [STR]', 'hardness'));
                break;
            case 'DODGE':
                parts.push(generateGenericKeyword('[DODGE]', 'A representation of how good the character is at evading danger. Increases with your [AGI]', 'dodge'));
                break;
            case 'TOUGHNESS':
                parts.push(generateGenericKeyword('[TOUGHNESS]', 'A representation of the characters bodily health and ability to resist internal injuries, poisons and concussions. Increases with your [CON]', 'toughness'));
                break;
            case 'WILLPOWER':
                parts.push(generateGenericKeyword('[WILLPOWER]', ' A representation of how well the character can resist being mind-controlled, feeling fear or resisting other mind affecting effects. Increases with your [SPI]', 'willpower'));
                break;
            case 'DR':
                parts.push(generateGenericKeyword('[DR]', 'Damage Resistance provides flat damage reduction against incoming damage', 'dr'));
                break;
            case 'AP':
                parts.push(generateGenericKeyword('[AP]', 'Action Points. Actions in combat that are not exclusively movement related such as attacking, casting spells or activating magic items require [AP] when used. The more [AP] a character has available, the more they can do during their turn.', 'ap'));
                break;
            case 'MP':
                parts.push(generateGenericKeyword('[MP]', 'Movement points. It is a measurement to determine how much someone can move during Combat, one Movement Point is equal to 1.5m (1 Square).', 'mp'));
                break;
            case 'REACTION':
                parts.push(generateGenericKeyword('[REACTION]', 'Once during a combat round you can use a [REACTION] which you gain at the start of the battle unless stated otherwise. At the start of each of your turns you regain your [REACTION] but you can only have one.', ''));
                break;
            case 'SIZE':
                parts.push(generateGenericKeyword('[SIZE]', 'Most humanoids are medium [SIZE], however certain species have different ones and certain effects might change your [SIZE]. Changing your [SIZE] affects your [STR] and [DODGE].', 'size'));
                break;
            case 'XP':
                parts.push(generateGenericKeyword('[XP]', 'Experience Points. Experience is accumulated during play by adventuring, defeating Monsters, solving Quests, good role-play and other achievements the Game Master deems worth-wile.', 'xp'));
                break;
            // ********************** STATUS EFFECTS **********************
            // TIER I Harmful Status Effects
            case 'BANE':
                parts.push(generateGenericKeyword('[BANE]', 'TODO', ''));
                break;
            case 'BLINDED':
                parts.push(generateGenericKeyword('[BLINDED]', 'TODO', ''));
                break;
            case 'CHARMED':
                parts.push(generateGenericKeyword('[CHARMED]', 'TODO', ''));
                break;
            case 'CRIPPLED':
                parts.push(generateGenericKeyword('[CRIPPLED]', 'TODO', ''));
                break;
            case 'CURSED':
                parts.push(generateGenericKeyword('[CURSED]', 'TODO', ''));
                break;
            case 'DAZED':
                parts.push(generateGenericKeyword('[DAZED]', 'TODO', ''));
                break;
            case 'DEAFENED':
                parts.push(generateGenericKeyword('[DEAFENED]', 'TODO', ''));
                break;
            case 'DISTRACTED':
                parts.push(generateGenericKeyword('[DISTRACTED]', 'TODO', ''));
                break;
            case 'SILENCED':
                parts.push(generateGenericKeyword('[SILENCED]', 'TODO', ''));
                break;
            case 'FRIGHTENED':
                parts.push(generateGenericKeyword('[FRIGHTENED]', 'TODO', ''));
                break;
            case 'GRAPPLED':
                parts.push(generateGenericKeyword('[GRAPPLED]', 'TODO', ''));
                break;
            case 'POISONED':
                parts.push(generateGenericKeyword('[POISONED]', 'TODO', ''));
                break;
            case 'BLEEDING':
                parts.push(generateGenericKeyword('[BLEEDING]', 'TODO', ''));
                break;
            case 'BURNING':
                parts.push(generateGenericKeyword('[BURNING]', 'TODO', ''));
                break;
            case 'POISON':
                parts.push(generateGenericKeyword('[POISON]', 'TODO', ''));
                break;
            case 'CORROSION':
                parts.push(generateGenericKeyword('[CORROSION]', 'TODO', ''));
                break;
            // TIER II Harmful Status Effects
            case 'CONFUSED':
                parts.push(generateGenericKeyword('[CONFUSED]', 'TODO', ''));
                break;
            case 'EXPOSED':
                parts.push(generateGenericKeyword('[EXPOSED]', 'TODO', ''));
                break;
            case 'INCAPACITATED':
                parts.push(generateGenericKeyword('[INCAPACITATED]', 'TODO', ''));
                break;
            case 'TAUNTED':
                parts.push(generateGenericKeyword('[TAUNTED]', 'TODO', ''));
                break;
            case 'TERRIFIED':
                parts.push(generateGenericKeyword('[TERRIFIED]', 'TODO', ''));
                break;
            case 'HYPTNOTIZED':
                parts.push(generateGenericKeyword('[HYPTNOTIZED]', 'TODO', ''));
                break;
            case 'STUNNED':
                parts.push(generateGenericKeyword('[STUNNED]', 'TODO', ''));
                break;
            case 'INTOXICATED':
                parts.push(generateGenericKeyword('[INTOXICATED]', 'TODO', ''));
                break;
            case 'RESTRAINED':
                parts.push(generateGenericKeyword('[RESTRAINED]', 'TODO', ''));
                break;
            case 'SLOWED':
                parts.push(generateGenericKeyword('[SLOWED]', 'TODO', ''));
                break;
            case 'SLEEPING':
                parts.push(generateGenericKeyword('[SLEEPING]', 'TODO', ''));
                break;
            // TIER III Harmful Status Effects
            case 'PETRIFIED':
                parts.push(generateGenericKeyword('[PETRIFIED]', 'TODO', ''));
                break;
            case 'UNCONCIOUS':
                parts.push(generateGenericKeyword('[UNCONCIOUS]', 'TODO', ''));
                break;
            case 'MIND-CONTROLLED':
                parts.push(generateGenericKeyword('[MIND-CONTROLLED]', 'TODO', ''));
                break;
            // TIER I Beneficial Status Effects
            case 'BLESS':
                parts.push(generateGenericKeyword('[BLESS]', 'TODO', ''));
                break;
            case 'INSPIRED':
                parts.push(generateGenericKeyword('[INSPIRED]', 'TODO', ''));
                break;
            case 'HEALING':
                parts.push(generateGenericKeyword('[HEALING]', 'TODO', ''));
                break;
            case 'PROTECTION':
                parts.push(generateGenericKeyword('[PROTECTION]', 'TODO', ''));
                break;
            // TIER II Beneficial Status Effects
            case 'INVISIBLE':
                parts.push(generateGenericKeyword('[INVISIBLE]', 'TODO', ''));
                break;
            case 'MAGIC RESISTANCE':
                parts.push(generateGenericKeyword('[MAGIC RESISTANCE]', 'TODO', ''));
                break;
            case 'HASTED':
                parts.push(generateGenericKeyword('[HASTED]', 'TODO', ''));
                break;
            // TIER III Beneficial Status Effects
            case 'MAGIC IMMUNITY':
                parts.push(generateGenericKeyword('[MAGIC IMMUNITY]', 'TODO', ''));
                break;
            default:
                console.error('Unrecognized keyword: ' + fullKeyword);
                break;
        }
        lastKeywordIndex = text.indexOf(']', keywordIndex) + 1;
    }

    if (lastKeywordIndex !== (text.length -1)) {
        let remainingText = text.substring(lastKeywordIndex, text.length);
        parts.push({type: 'text', text: remainingText});
    }
    
    return parts;
}

function generateAttributeKeyword(attribute: Attribute): ContentPart {
    return { 
        type: 'keyword', 
        component: {
            keyword: attribute.keyword, 
            toolTipText: attribute.shortdescription, 
            link: attribute.name
        }
    };
}

function generateGenericKeyword(keyword: string, toolTipText: string, link: string): ContentPart {
    return { 
        type: 'keyword', 
        component: {
            keyword: keyword, 
            toolTipText: toolTipText, 
            link: link
        }
    };
}

export type ContentPart = {
    type: 'text' | 'keyword';
    text?: string; 
    component?: KeywordContent;
}

type KeywordContent = {
    keyword: string,
    toolTipText: string,
    link: string
}