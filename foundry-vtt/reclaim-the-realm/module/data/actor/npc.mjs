import BaseActorDataModel from './base-actor.mjs';
const { HTMLField } = foundry.data.fields;

export default class NPCDataModel extends BaseActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            description: new HTMLField({ required: true, blank: true }),
        };
    }
}