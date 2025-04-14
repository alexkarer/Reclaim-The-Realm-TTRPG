import { Cost, Equipment } from "../equipment";

import otherItemsJson from './other_items.json';
export type OtherItemJson = typeof otherItemsJson.wearables[0] | typeof otherItemsJson.survival[0] | typeof otherItemsJson.toolsAndGadgets[0] | typeof otherItemsJson.consumables[0];

export const otherItems: Equipment[] = [
    ...otherItemsJson.wearables.map(item => map(item)),
    ...otherItemsJson.consumables.map(item => map(item)),
    ...otherItemsJson.survival.map(item => map(item)),
    ...otherItemsJson.toolsAndGadgets.map(item => map(item))
]

function map(jsonOtherItem: OtherItemJson): Equipment {
    let shield = new Equipment();
    shield.name = jsonOtherItem.name;
    shield.tier = jsonOtherItem.tier;
    shield.craftingSkill = jsonOtherItem.craftingSkill;
    shield.cost = Cost.of(jsonOtherItem.cost);
    shield.weightInGram = jsonOtherItem.weightInGram;
    shield.type = jsonOtherItem.type;
    shield.description = jsonOtherItem.description;

    return shield;
}
