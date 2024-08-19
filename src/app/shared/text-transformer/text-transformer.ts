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
        let processedText = processAttributeKeywords(text);
        return processedText;
    }
}

function processAttributeKeywords(text: string): ContentPart[] {
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
                parts.push(generateGenericKeyword('[D20 TEST]', 'TODO', 'd20-test'));
                break;
            case 'DT':
                parts.push(generateGenericKeyword('[DT]', 'TODO', 'dt'));
                break;
            case 'ADVANTAGE':
                parts.push(generateGenericKeyword('[ADVANTAGE]', 'TODO', ''));
                break;
            case 'DISADVANTAGE':
                parts.push(generateGenericKeyword('[DISADVANTAGE]', 'TODO', ''));
                break;
            case 'ATTRIBUTE TEST':
                parts.push(generateGenericKeyword('[ATTRIBUTE TEST]', 'TODO', 'attribute-test'));
                break;
            case 'SKILL TEST':
                parts.push(generateGenericKeyword('[SKILL TEST]', 'TODO', ''));
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
                parts.push(generateGenericKeyword('[MARTIAL RANGED ATTACK]', 'TODO', ''));
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
                parts.push(generateGenericKeyword('[SAVE]', 'TODO', ''));
                break;
            case 'HARDNESS SAVE':
                parts.push(generateGenericKeyword('[HARDNESS SAVE]', 'TODO', ''));
                break;
            case 'DODGE SAVE':
                parts.push(generateGenericKeyword('[DODGE SAVE]', 'TODO', ''));
                break;
            case 'TOUGHNESS SAVE':
                parts.push(generateGenericKeyword('[TOUGHNESS SAVE]', 'TODO', ''));
                break;
            case 'WILLPOWER SAVE':
                parts.push(generateGenericKeyword('[WILLPOWER SAVE]', 'TODO', ''));
                break;
            // ********************** CHARACTER VALUES **********************
            case 'LEVEL':
                parts.push(generateGenericKeyword('[LEVEL]', 'TODO', ''));
                break;
            case 'MARTIAL LEVEL':
                parts.push(generateGenericKeyword('[MARTIAL LEVEL]', 'TODO', ''));
                break;
            case 'SPELL LEVEL':
                parts.push(generateGenericKeyword('[SPELL LEVEL]', 'TODO', ''));
                break;
            case 'HP':
                parts.push(generateGenericKeyword('[HP]', 'TODO', ''));
                break;
            case 'THP':
                parts.push(generateGenericKeyword('[THP]', 'TODO', ''));
                break;
            case 'STAMINA':
                parts.push(generateGenericKeyword('[STAMINA]', 'TODO', ''));
                break;
            case 'ARCANA':
                parts.push(generateGenericKeyword('[ARCANA]', 'TODO', ''));
                break;
            case 'HARDNESS':
                parts.push(generateGenericKeyword('[HARDNESS]', 'TODO', ''));
                break;
            case 'DODGE':
                parts.push(generateGenericKeyword('[DODGE]', 'TODO', ''));
                break;
            case 'TOUGHNESS':
                parts.push(generateGenericKeyword('[TOUGHNESS]', 'TODO', ''));
                break;
            case 'WILLPOWER':
                parts.push(generateGenericKeyword('[WILLPOWER]', 'TODO', ''));
                break;
            case 'AP':
                parts.push(generateGenericKeyword('[AP]', 'TODO', ''));
                break;
            case 'MP':
                parts.push(generateGenericKeyword('[MP]', 'TODO', ''));
                break;
            case 'REACTION':
                parts.push(generateGenericKeyword('[REACTION]', 'TODO', ''));
                break;
            case 'SIZE':
                parts.push(generateGenericKeyword('[SIZE]', 'TODO', ''));
                break;
            case 'XP':
                parts.push(generateGenericKeyword('[XP]', 'TODO', ''));
                break;
            // ********************** SKILLS **********************
            case 'ANIMAL HANDLING':
                parts.push(generateGenericKeyword('[ANIMAL HANDLING]', 'TODO', ''));
                break;
            case 'ATHLETICS':
                parts.push(generateGenericKeyword('[ATHLETICS]', 'TODO', ''));
                break;
            case 'DECEPTION':
                parts.push(generateGenericKeyword('[DECEPTION]', 'TODO', ''));
                break;
            case 'INVESTIGATION':
                parts.push(generateGenericKeyword('[INVESTIGATION]', 'TODO', ''));
                break;
            case 'INTIMIDATION':
                parts.push(generateGenericKeyword('[INTIMIDATION]', 'TODO', ''));
                break;
            case 'MEDICINE':
                parts.push(generateGenericKeyword('[MEDICINE]', 'TODO', ''));
                break;
            case 'PERSUASION':
                parts.push(generateGenericKeyword('[PERSUASION]', 'TODO', ''));
                break;
            case 'AWARENESS':
                parts.push(generateGenericKeyword('[AWARENESS]', 'TODO', ''));
                break;
            case 'STEALTH':
                parts.push(generateGenericKeyword('[STEALTH]', 'TODO', ''));
                break;
            case 'SURVIVAL':
                parts.push(generateGenericKeyword('[SURVIVAL]', 'TODO', ''));
                break;
            case 'THIEVERY':
                parts.push(generateGenericKeyword('[THIEVERY]', 'TODO', ''));
                break;
            case 'CULTURE':
                parts.push(generateGenericKeyword('[CULTURE]', 'TODO', ''));
                break;
            case 'GEOGRAPHY':
                parts.push(generateGenericKeyword('[GEOGRAPHY]', 'TODO', ''));
                break;
            case 'MAGIC':
                parts.push(generateGenericKeyword('[MAGIC]', 'TODO', ''));
                break;
            case 'NATURE':
                parts.push(generateGenericKeyword('[NATURE]', 'TODO', ''));
                break;
            case 'SUPERNATURAL':
                parts.push(generateGenericKeyword('[SUPERNATURAL]', 'TODO', ''));
                break;
            case "SMITH'S TOOLS":
                parts.push(generateGenericKeyword("[SMITH'S TOOLS]", 'TODO', ''));
                break;
            case 'ALCHEMY KIT':
                parts.push(generateGenericKeyword('[ALCHEMY KIT]', 'TODO', ''));
                break;
            case "JEWELLER'S TOOLS":
                parts.push(generateGenericKeyword("[JEWELLER'S TOOLS]", 'TODO', ''));
                break;
            case "TAILOR'S SET":
                parts.push(generateGenericKeyword("[TAILOR'S SET]", 'TODO', ''));
                break;
            case "CARPENTER'S TOOLS":
                parts.push(generateGenericKeyword("[CARPENTER'S TOOLS]", 'TODO', ''));
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