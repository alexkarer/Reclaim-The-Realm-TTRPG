import { Pipe, PipeTransform } from "@angular/core";
import { Attribute, attributes } from '../../../../../common_resources/character_values/attributes/attribute';
import { ContentPart, generateGenericKeyword } from "./text-utils";
import statusEffectsJson from '../../../../../common_resources/combat/status_effects.json';

let combinedStatusEffects = [...statusEffectsJson.tierOneBeneficialStatusEffects];
combinedStatusEffects.push(...statusEffectsJson.tierOneHarmfulStatusEffects);
combinedStatusEffects.push(...statusEffectsJson.tierTwoBeneficialStatusEffects);
combinedStatusEffects.push(...statusEffectsJson.tierTwoHarmfulStatusEffects);
combinedStatusEffects.push(...statusEffectsJson.tierThreeBeneficialStatusEffects);
combinedStatusEffects.push(...statusEffectsJson.tierThreeHarmfulStatusEffects);
;
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
    let attributeContentPart = getAttributeContentPart(keyword);
    if (attributeContentPart) {
        return attributeContentPart;
    }

    let gameMechanicsContentPart = getGameMechanicsContentPart(keyword);
    if (gameMechanicsContentPart) {
        return gameMechanicsContentPart;
    }

    let characterValuesContentPart = getCharacterValuesContentPart(keyword);
    if (characterValuesContentPart) {
        return characterValuesContentPart;
    }

    // check status effects last because they have the worst performance
    let statusEffectsContentPart = getStatusEffectsContentPart(keyword);
    if (statusEffectsContentPart) {
        return statusEffectsContentPart;
    }

    console.error('Unrecognized keyword: ' + keyword);
    return {type: 'text', text: ''};
}

function getAttributeContentPart(keyword: string): ContentPart | undefined {
    switch(keyword) {
        case attributes[0].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[0]);
        case attributes[1].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[1]);
        case attributes[2].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[2]);
        case attributes[3].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[3]);
        case attributes[4].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[4]);
        case attributes[5].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[5]);
        case attributes[6].keyword.replaceAll(/[\[\]]/g, ''):
            return generateAttributeKeyword(attributes[6]);
        default:
            return undefined;
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

function getGameMechanicsContentPart(keyword: string): ContentPart | undefined {
    switch (keyword) {
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
            return generateGenericKeyword('[ATTACK]', 'TODO', 'attack');
        case 'MELEE ATTACK':
            return generateGenericKeyword('[MELEE ATTACK]', 'TODO', 'attack');
        case 'RANGED ATTACK':
            return generateGenericKeyword('[RANGED ATTACK]', 'TODO', 'attack');
        case 'MARTIAL TEST':
            return generateGenericKeyword('[MARTIAL TEST]', 'TODO', '');
        case 'MELEE MARTIAL ATTACK':
            return generateGenericKeyword('[MEELE MARTIAL ATTACK]', 'TODO', 'attack');
        case 'RANGED MARTIAL ATTACK':
            return generateGenericKeyword('[RANGED MARTIAL ATTACK]', 'TODO', 'attack');
        case 'SPELL ABILITY':
            return generateGenericKeyword('[SPELL ABILITY]', 'Any Ability with the [SPELL ABILITY] Tag, these Abilities also have a number associated with it, if not the nuzmber is 0.', 'spell-test');
        case 'SPELL CAST TEST':
            return generateGenericKeyword('[SPELL CAST TEST]', 'Roll 2d6 + [SPELL LEVEL] and if the roll is lower than the Cast Difficulty of the Spell or double 1s, a magical mishap occurs after the spell was cast.', 'spell-test');
        case 'SPELL TEST':
            return generateGenericKeyword('[SPELL TEST]', 'Tests made when casting Spells. A [SPELL TEST] is a [D20 TEST] that benefits from your [SPELL LEVEL] and an Attribute that is stated in the context.', 'spell-test');
        case 'MELEE SPELL ATTACK':
            return generateGenericKeyword('[MELEE SPELL ATTACK]', '[MELEE ATTACK], [SPELL TEST]. Certain spells require you to direct a spell towards a target in close range of you which attempts to dodge that. The Attack Bonus is [AGI] + [SPELL LEVEL]', 'melee-spell-attack');
        case 'RANGED SPELL ATTACK':
            return generateGenericKeyword('[RANGED SPELL ATTACK]', '[RANGED ATTACK], [SPELL TEST]. Certain spells require you to hit targets with a magic projectile towards a target which attempts to dodge that. For these spells make an Attack Roll using your Ranged Spell Attack Bonus which is calulated the following way: [PER] + [SPELL LEVEL]', 'ranged-spell-attack');
        case 'CONCENTRATION':
            return generateGenericKeyword('[CONCENTRATION]', 'Abilities with these keywords need to activly maintained by the caster. They are listed with a number which denotes how much [AP] they need to spend to maintain the ability, if they are not able to spend the [AP] the ability ends.', 'concentration-test');
        case 'CONCENTRATION TEST':
            return generateGenericKeyword('[CONCENTRATION TEST]', '[SPELL TEST]. A Concentration Test determines if you can maintain focus on a spell while external factors attempt to disrupt it. A [CONCENTRATION TEST] is made by rolling a d20 and adding your Concentration Bonus, which is calculated the following way: [CON] + [SPELL LEVEL]', 'concentration-test');
        case 'SAVE':
            return generateGenericKeyword('[SAVE]', 'TODO', 'save');
        case 'SHIELD BLOCK':
            return generateGenericKeyword('[SHIELD BLOCK]', 'When wielding and hit by an [ATTACK], instead of a [DODGE] [SAVE] make a [SHIELD BLOCK]. Which is a [SAVE] with a bonus of Shield Block + [MARTIAL LEVEL]', 'shield-block');
        case 'EXHAUSTION':
            return generateGenericKeyword('[EXHAUSTION]', 'When characters push themselves beyond their physical limits, they suffer points of [EXHAUSTION] which grant a cumulative -1 penalty to any [D20 TEST]. If that increases beyond their limit they fall unconcious, if it increases above twice their limit they die.', 'exhaustion');
        case 'DEATHS DOOR':
            return generateGenericKeyword('[DEATHS DOOR]', '[DEATHS DOOR] is a mechanic that allows you to keep on fighting even when you are reduced to 0 [HP] however at great risks to yourself.', 'deaths-door');
        case 'ROUND':
            return generateGenericKeyword('[ROUND]', 'TODO', 'round');
        case 'TURN':
            return generateGenericKeyword('[TURN]', 'TODO', 'turn');
        case 'MELEE RANGE':
            return generateGenericKeyword('[MELEE RANGE]', 'within 1.5m of you, can be modified by [SIZE] and certain abilities', 'ranges');
        case 'WEAPON RANGE':
            return generateGenericKeyword('[WEAPON RANGE]', 'within range to be targeted by any weapon you wield, ranged or melee.', 'ranges');
        case 'SELF':
            return generateGenericKeyword('[SELF]', 'you are the target', 'targets');
        case 'AURA':
            return generateGenericKeyword('[AURA]', 'listed with a radius, effects every creature that is within range of that radius. The effect is applied at the start of the target creatures turn or the first time they enter the aura radius but only once during a [ROUND].', 'targets');
        case 'SPHERE':
            return generateGenericKeyword('[SPHERE]', 'listed with a radius, the center of a sphere needs to be within range of the ability and the center is always in between squares', 'targets');
        case 'LINE':
            return generateGenericKeyword('[LINE]', 'listed with a length x width. It starts from the caster of the ability and extends until the lenght.', 'targets');
        case 'CONE':
            return generateGenericKeyword('[CONE]', 'A cone with the listed length starting from the ability caster.', 'targets');
        case 'INSTANT':
            return generateGenericKeyword('[INSTANT]', 'Ability happens now and there are no lingering effects. The actor can not use any other abilities until all the effects of this ability have been resolved.', 'duration');
        case 'HALF':
            return generateGenericKeyword('[HALF]', 'If the related [ATTACK], [SPELL TEST] or [MARTIAL TEST] fails then the ability does still half the damage it would on a success. However no additional effects are applied unless stated otherwise.', 'targets');
        case 'SAVE ENDS':
            return generateGenericKeyword('[SAVE ENDS]', 'The target can repeat the [SAVE] at the end of each of their [TURN] ending all effects of the ability on a sucess', 'targets');
        default:
            return undefined;
    }
}

function getCharacterValuesContentPart(keyword: string): ContentPart | undefined {
    switch(keyword) {
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
        case 'MARTIAL DAMAGE':
            return generateGenericKeyword('[MARTIAL DAMAGE]', 'The damage you deal with weapon attacks, split into light, one-handed and two-handed damage.', 'martial-damage');
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
        case 'FREE':
            return generateGenericKeyword('[FREE]', 'Abilities with this Cost can be used any time and can also be used outside the actors [TURN] without consuming a [REACTION].', 'free');
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
    }
    return undefined;
}

function getStatusEffectsContentPart(keyword: string): ContentPart | undefined {
    let foundKeywords = combinedStatusEffects.filter(effect => effect.keyword.replaceAll(/[\[\]]/g, '') === keyword);
    if (foundKeywords.length > 0) {
        return generateGenericKeyword(foundKeywords[0].keyword, foundKeywords[0].summary, foundKeywords[0].link);
    }
    return undefined;
}