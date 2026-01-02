import { Pipe, PipeTransform } from "@angular/core";
import { ContentPart, generateGenericKeyword } from "./text-utils";
import statusEffectsJson from '../../../../../common_resources/combat/status_effects.json';
import keywordsJson from '../../../../../common_resources/keywords.json';
import { Ability } from "../../../../../common_resources/shared/Ability";
import { STANDARD_ABILITIES } from "../../../../../common_resources/core_rules/combat/standard_abilities";
import { ALL_TECHNIQUES } from "../../../../../common_resources/player_rules/techniques/technique";

const statusEffectMap = [
    ...statusEffectsJson.tierOneBeneficialStatusEffects,
    ...statusEffectsJson.tierOneHarmfulStatusEffects,
    ...statusEffectsJson.tierTwoBeneficialStatusEffects,
    ...statusEffectsJson.tierTwoHarmfulStatusEffects,
    ...statusEffectsJson.tierThreeBeneficialStatusEffects,
    ...statusEffectsJson.tierThreeHarmfulStatusEffects
].reduce((map, v) => map.set(v.keyword, v), new Map<string, typeof statusEffectsJson.tierOneBeneficialStatusEffects[0]>());

const keywordMap = keywordsJson.reduce((map, v) => map.set(v.name, v), new Map<string, typeof keywordsJson[0]>());

const allAbilities: Ability[] = [
    ...STANDARD_ABILITIES,
    ...ALL_TECHNIQUES
];
const abilitiesMap = allAbilities.reduce((map, a) => map.set(a.name, a), new Map<string, Ability>);

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

    const abilityContentPart = generateAbilityontentPart(keyword);
    if (abilityContentPart) {
        return abilityContentPart;
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

function generateAbilityontentPart(keyword: string): ContentPart | undefined {
    if (keyword.startsWith('ABILITY')) {
        const abilityName = keyword.substring(8);
        const ability = abilitiesMap.get(abilityName);
        if (ability) {
            return { 
                type: 'ability',
                text: `${keyword.substring(8)}`,
                ability: ability
            };
        } else {
            console.error(`Ability "${abilityName}" not found`);
        }
    }
    return undefined;
}

function generateRulesContentPart(keyword: string): ContentPart | undefined {
    const foundKeyword = keywordMap.get(keyword);
    if (foundKeyword) {
        return generateGenericKeyword(foundKeyword.displayName, foundKeyword.description, foundKeyword.link);
    }
    return undefined;
}

function getStatusEffectsContentPart(keyword: string): ContentPart | undefined {
    let foundKeyword = statusEffectMap.get(`[${keyword}]`);
    if (foundKeyword) {
        return generateGenericKeyword(foundKeyword.keyword, foundKeyword.summary, foundKeyword.link);
    }
    return undefined;
}