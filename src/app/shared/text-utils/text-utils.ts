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
    type: 'text' | 'keyword';
    text?: string; 
    component?: KeywordContent;
}

type KeywordContent = {
    keyword: string,
    toolTipText: string,
    link: string
}