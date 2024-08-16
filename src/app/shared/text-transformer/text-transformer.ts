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
            case 'ATTRIBUTE TEST':
                parts.push(generateGenericKeyword('[ATTRIBUTE TEST]', 'TODO', 'attribute-test'));
                break;
            case 'D20 TEST':
                parts.push(generateGenericKeyword('[D20 TEST]', 'TODO', 'd20-test'));
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