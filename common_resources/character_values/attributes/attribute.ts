import attributesJson from './attributes.json'

export const attributes: Attribute[] = attributesJson;
export type Attribute = typeof attributesJson[0];