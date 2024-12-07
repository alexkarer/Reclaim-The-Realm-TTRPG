import { Pipe, PipeTransform } from "@angular/core";
import { Attribute, attributes } from '../../../../ttrpg_resources/character_values/attributes/attribute';
import { ContentPart, generateGenericKeyword } from "./text-utils";

@Pipe({
    name: 'keywordProcessor',
    standalone: true,
})
export class KeywordProcessorPipe implements PipeTransform {
    transform(text: string | undefined): ContentPart[] {
        if (!text) {
            return [];
        }
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
            parts.push(keywordToContentPart(fullKeyword));
            
            lastKeywordIndex = text.indexOf(']', keywordIndex) + 1;
        }
    
        if (lastKeywordIndex !== (text.length -1)) {
            let remainingText = text.substring(lastKeywordIndex, text.length);
            parts.push({type: 'text', text: remainingText});
        }
        
        return parts;
    }
}

function keywordToContentPart(keyword: string): ContentPart {
    switch(keyword) {
        // ********************** ATTRIBUTES **********************
        case 'STR':
            return generateAttributeKeyword(attributes[0]);
        case 'AGI':
            return generateAttributeKeyword(attributes[1]);
        case 'CON':
            return generateAttributeKeyword(attributes[2]);
        case 'INT':
            return generateAttributeKeyword(attributes[3]);
        case 'SPI':
            return generateAttributeKeyword(attributes[4]);
        case 'PER':
            return generateAttributeKeyword(attributes[5]);
        case 'CHA':
            return generateAttributeKeyword(attributes[6]);
        // ********************** MECHANICS **********************
        case 'D20 TEST':
            return generateGenericKeyword('[D20 TEST]', 'On a d20 Test you roll a d20 dice and most of a time add a number to the result which decreases or increases the result which is made against some Difficulty Threshold [DT] that has to be exceeded.', 'd20-test');
        case 'DT':
            return generateGenericKeyword('[DT]', 'The difficulty of any [D20 TEST] is measured by the Difficulty Threshld ([DT]). The [DT] should be exlusivly based upon the difficulty of the action the actor attempts.', 'dt');
        case 'ADVANTAGE':
            return generateGenericKeyword('[ADVANTAGE]', 'When you make a [D20 TEST] you roll the d20 twice and take the better result.', 'adv-disadv');
        case 'DISADVANTAGE':
            return generateGenericKeyword('[DISADVANTAGE]', 'When you make a [D20 TEST] you roll the d20 twice and take the worse result.', 'adv-disadv');
        case 'ATTRIBUTE TEST':
            return generateGenericKeyword('[ATTRIBUTE TEST]', 'An [ATTRIBUTE TEST] is a [D20 TEST] to determine if you can succeed in a certain activity related to a specific Attribute. Simply roll a d20 and add the related Attribute.', 'attribute-test');
        case 'SKILL TEST':
            return generateGenericKeyword('[SKILL TEST]', 'A Skill Test is an [ATTRIBUTE TEST] where also ranks of a Skill can be added to the bonus.', '');
        case 'ATTACK':
            return generateGenericKeyword('[ATTACK]', 'TODO', '');
        case 'MELEE ATTACK':
            return generateGenericKeyword('[MELEE ATTACK]', 'TODO', '');
        case 'RANGED ATTACK':
            return generateGenericKeyword('[RANGED ATTACK]', 'TODO', '');
        case 'MARTIAL TEST':
            return generateGenericKeyword('[MARTIAL TEST]', 'TODO', '');
        case 'MELEE MARTIAL ATTACK':
            return generateGenericKeyword('[MARTIAL MEELE ATTACK]', 'TODO', '');
        case 'RANGED MARTIAL ATTACK':
            return generateGenericKeyword('[RANGED MARTIAL ATTACK]', 'TODO', '');
        case 'SPELL TEST':
            return generateGenericKeyword('[SPELL TEST]', 'Tests made when casting Spells. A [SPELL TEST] is a [D20 TEST] that benefits from your [SPELL LEVEL] and an Attribute that is stated in the context.', 'spell-test');
        case 'MELEE SPELL ATTACK':
            return generateGenericKeyword('[MELEE SPELL ATTACK]', '[MELEE ATTACK], [SPELL TEST]. Certain spells require you to direct a spell towards a target in close range of you which attempts to dodge that. The Attack Bonus is [AGI] + [SPELL LEVEL]', 'melee-spell-attack');
        case 'RANGED SPELL ATTACK':
            return generateGenericKeyword('[RANGED SPELL ATTACK]', '[RANGED ATTACK], [SPELL TEST]. Certain spells require you to hit targets with a magic projectile towards a target which attempts to dodge that. For these spells make an Attack Roll using your Ranged Spell Attack Bonus which is calulated the following way: [PER] + [SPELL LEVEL]', 'ranged-spell-attack');
        case 'CONCENTRATION TEST':
            return generateGenericKeyword('[CONCENTRATION TEST]', '[SPELL TEST]. A Concentration Test determines if you can maintain focus on a spell while external factors attempt to disrupt it. A [CONCENTRATION TEST] is made by rolling a d20 and adding your Concentration Bonus, which is calculated the following way: [CON] + [SPELL LEVEL]', 'concentration-test');
        case 'SAVE':
            return generateGenericKeyword('[SAVE]', 'TODO', 'save');
        case 'OPPORTUNITY ATTACK':
            return generateGenericKeyword('[OPPORTUNITY ATTACK]', 'TODO', '');
        case 'EXHAUSTION':
            return generateGenericKeyword('[EXHAUSTION]', 'When characters push themselves beyond their physical limits, they suffer points of [EXHAUSTION] which grant a cumulative -1 penalty to any [D20 TEST]. If that increases beyond their limit they fall unconcious, if it increases above twice their limit they die.', 'exhaustion');
        case 'DEATHS DOOR':
            return generateGenericKeyword('DEATHS DOOR', '[DEATHS DOOR] is a mechanic that allows you to keep on fighting even when you are reduced to 0 [HP] however at great risks to yourself.', 'deaths-door')
        // ********************** CHARACTER VALUES **********************
        case 'LEVEL':
            return generateGenericKeyword('[LEVEL]', 'Your characters current [LEVEL], it increases as your character spends time adventuring and earns [XP]. When your [LEVEL] increases your characters statistics also improve in several ways.', 'level');
        case 'MARTIAL LEVEL':
            return generateGenericKeyword('[MARTIAL LEVEL]', 'Your Characters [MARTIAL LEVEL] is calculated by multiplying the Martial Level Progression of your Class with your [LEVEL] and rounding down.', 'martial-level');
        case 'SPELL LEVEL':
            return generateGenericKeyword('[SPELL LEVEL]', 'Your Characters [SPELL LEVEL] is calculated by multiplying the Spellcasting Level Progression of your Class with your [LEVEL] and rounding down.', 'spell-level');
        case 'HP':
            return generateGenericKeyword('[HP]', 'Health Points. Represents how much damage you can take before going unconcious.', 'hp');
        case 'THP':
            return generateGenericKeyword('[THP]', 'Temporary health points. They are a buffer against damage, a pool of hit points that protect you from injury.', 'thp');
        case 'STAMINA':
            return generateGenericKeyword('[STAMINA]', '[STAMINA] is your energy reserve with which you can replenish your Resources like HP and Aether and is used up when performing physically demanding tasks.', 'stamina');
        case 'ARCANA':
            return generateGenericKeyword('[ARCANA]', 'Your [ARCANA] represents an energy reserve you expend when drawing power from the elemental planes and the aether to cast spells.', 'arcana');
        case 'HARDNESS':
            return generateGenericKeyword('[HARDNESS]', 'A representation of the characters resistance against being forcefully moved or crushed against their will. Increases with your [STR]', 'hardness');
        case 'DODGE':
            return generateGenericKeyword('[DODGE]', 'A representation of how good the character is at evading danger. Increases with your [AGI]', 'dodge');
        case 'TOUGHNESS':
            return generateGenericKeyword('[TOUGHNESS]', 'A representation of the characters bodily health and ability to resist internal injuries, poisons and concussions. Increases with your [CON]', 'toughness');
        case 'WILLPOWER':
            return generateGenericKeyword('[WILLPOWER]', ' A representation of how well the character can resist being mind-controlled, feeling fear or resisting other mind affecting effects. Increases with your [SPI]', 'willpower');
        case 'DR':
            return generateGenericKeyword('[DR]', 'Damage Resistance provides flat damage reduction against incoming damage', 'dr');
        case 'AP':
            return generateGenericKeyword('[AP]', 'Action Points. Actions in combat that are not exclusively movement related such as attacking, casting spells or activating magic items require [AP] when used. The more [AP] a character has available, the more they can do during their turn.', 'ap');
        case 'MP':
            return generateGenericKeyword('[MP]', 'Movement points. It is a measurement to determine how much someone can move during Combat, one Movement Point is equal to 1.5m (1 Square).', 'mp');
        case 'REACTION':
            return generateGenericKeyword('[REACTION]', 'Once during a combat round you can use a [REACTION] which you gain at the start of the battle unless stated otherwise. At the start of each of your turns you regain your [REACTION] but you can only have one.', '');
        case 'SIZE':
            return generateGenericKeyword('[SIZE]', 'Most humanoids are medium [SIZE], however certain species have different ones and certain effects might change your [SIZE]. Changing your [SIZE] affects your [STR] and [DODGE].', 'size');
        case 'XP':
            return generateGenericKeyword('[XP]', 'Experience Points. Experience is accumulated during play by adventuring, defeating Monsters, solving Quests, good role-play and other achievements the Game Master deems worth-wile.', 'xp');
        // ********************** STATUS EFFECTS **********************
        // TODO use the json similar to attributes
        // TIER I Harmful Status Effects
        case 'BANE':
            return generateGenericKeyword('[BANE]', 'TODO', '');
        case 'BLINDED':
            return generateGenericKeyword('[BLINDED]', 'TODO', '');
        case 'CHARMED':
            return generateGenericKeyword('[CHARMED]', 'TODO', '');
        case 'CRIPPLED':
            return generateGenericKeyword('[CRIPPLED]', 'TODO', '');
        case 'CURSED':
            return generateGenericKeyword('[CURSED]', 'TODO', '');
        case 'DAZED':
            return generateGenericKeyword('[DAZED]', 'TODO', '');
        case 'DEAFENED':
            return generateGenericKeyword('[DEAFENED]', 'TODO', '');
        case 'DISTRACTED':
            return generateGenericKeyword('[DISTRACTED]', 'TODO', '');
        case 'SILENCED':
            return generateGenericKeyword('[SILENCED]', 'TODO', '');
        case 'FRIGHTENED':
            return generateGenericKeyword('[FRIGHTENED]', 'TODO', '');
        case 'GRAPPLED':
            return generateGenericKeyword('[GRAPPLED]', 'TODO', '');
        case 'POISONED':
            return generateGenericKeyword('[POISONED]', 'TODO', '');
        case 'BLEEDING':
            return generateGenericKeyword('[BLEEDING]', 'TODO', '');
        case 'BURNING':
            return generateGenericKeyword('[BURNING]', 'TODO', '');
        case 'POISON':
            return generateGenericKeyword('[POISON]', 'TODO', '');
        case 'CORROSION':
            return generateGenericKeyword('[CORROSION]', 'TODO', '');
        // TIER II Harmful Status Effects
        case 'CONFUSED':
            return generateGenericKeyword('[CONFUSED]', 'TODO', '');
        case 'EXPOSED':
            return generateGenericKeyword('[EXPOSED]', 'TODO', '');
        case 'INCAPACITATED':
            return generateGenericKeyword('[INCAPACITATED]', 'TODO', '');
        case 'TAUNTED':
            return generateGenericKeyword('[TAUNTED]', 'TODO', '');
        case 'TERRIFIED':
            return generateGenericKeyword('[TERRIFIED]', 'TODO', '');
        case 'HYPTNOTIZED':
            return generateGenericKeyword('[HYPTNOTIZED]', 'TODO', '');
        case 'STUNNED':
            return generateGenericKeyword('[STUNNED]', 'TODO', '');
        case 'INTOXICATED':
            return generateGenericKeyword('[INTOXICATED]', 'TODO', '');
        case 'RESTRAINED':
            return generateGenericKeyword('[RESTRAINED]', 'TODO', '');
        case 'SLOWED':
            return generateGenericKeyword('[SLOWED]', 'TODO', '');
        case 'SLEEPING':
            return generateGenericKeyword('[SLEEPING]', 'TODO', '');
        // TIER III Harmful Status Effects
        case 'PETRIFIED':
            return generateGenericKeyword('[PETRIFIED]', 'TODO', '');
        case 'UNCONCIOUS':
            return generateGenericKeyword('[UNCONCIOUS]', 'TODO', '');
        case 'MIND-CONTROLLED':
            return generateGenericKeyword('[MIND-CONTROLLED]', 'TODO', '');
        // TIER I Beneficial Status Effects
        case 'BLESS':
            return generateGenericKeyword('[BLESS]', 'TODO', '');
        case 'INSPIRED':
            return generateGenericKeyword('[INSPIRED]', 'TODO', '');
        case 'HEALING':
            return generateGenericKeyword('[HEALING]', 'TODO', '');
        case 'PROTECTION':
            return generateGenericKeyword('[PROTECTION]', 'TODO', '');
        // TIER II Beneficial Status Effects
        case 'INVISIBLE':
            return generateGenericKeyword('[INVISIBLE]', 'TODO', '');
        case 'MAGIC RESISTANCE':
            return generateGenericKeyword('[MAGIC RESISTANCE]', 'TODO', '');
        case 'HASTED':
            return generateGenericKeyword('[HASTED]', 'TODO', '');
        // TIER III Beneficial Status Effects
        case 'MAGIC IMMUNITY':
            return generateGenericKeyword('[MAGIC IMMUNITY]', 'TODO', '');
        default:
            console.error('Unrecognized keyword: ' + keyword);
            return {type: 'text', text: ''};
    }
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
