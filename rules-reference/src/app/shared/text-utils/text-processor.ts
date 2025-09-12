import { Pipe, PipeTransform } from "@angular/core";
import { ContentPart, generateGenericKeyword } from "./text-utils";
import statusEffectsJson from '../../../../../common_resources/combat/status_effects.json';
import keywordsJson from '../../../../../common_resources/keywords.json';

const combinedStatusEffects = [
    ...statusEffectsJson.tierOneBeneficialStatusEffects,
    ...statusEffectsJson.tierOneHarmfulStatusEffects,
    ...statusEffectsJson.tierTwoBeneficialStatusEffects,
    ...statusEffectsJson.tierTwoHarmfulStatusEffects,
    ...statusEffectsJson.tierThreeBeneficialStatusEffects,
    ...statusEffectsJson.tierThreeHarmfulStatusEffects
];

const keywords = keywordsJson.reduce((map, v) => map.set(v.name, v), new Map<string, typeof keywordsJson[0]>());

@Pipe({
    name: 'textProcessor',
    standalone: true,
})
export class TextProcessorPipe implements PipeTransform {
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
    const tagContentPart = generateTagContentPart(keyword);
    if (tagContentPart) {
        return tagContentPart;
    }

    const rulesKeyword = generateRulesContentPart(keyword);
    if (rulesKeyword) {
        return rulesKeyword;
    }

    const statusEffectContentPart = getStatusEffectsContentPart(keyword);
    if (statusEffectContentPart) {
        return statusEffectContentPart;
    }

    console.error('Unrecognized keyword: ' + keyword);
    return {type: 'text', text: ''};
}

function generateTagContentPart(keyword: string): ContentPart | undefined {
    if (keyword.startsWith('TAG')) {
        return { 
            type: 'tag',
            text: keyword.substring(4)
        };
    }
    return undefined;
}

function generateRulesContentPart(keyword: string): ContentPart | undefined {
    const foundKeyword = keywords.get(keyword);
    if (foundKeyword) {
        return generateGenericKeyword(foundKeyword.name, foundKeyword.description, foundKeyword.link);
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