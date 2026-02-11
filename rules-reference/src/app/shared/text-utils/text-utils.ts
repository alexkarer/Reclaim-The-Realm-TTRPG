import { Ability } from "../../../../../common_resources/shared/Ability";

export function generateGenericKeyword(keyword: string, toolTipText: string, link: string): ContentPart {
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
    type: 'text' | 'keyword' | 'tag' | 'ability' | 'currency';
    text?: string; 
    component?: KeywordContent;
    ability?: Ability
}

type KeywordContent = {
    keyword: string,
    toolTipText: string,
    link: string
}
