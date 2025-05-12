import BaseActorDataModel from './base-actor.mjs';
const { HTMLField } = foundry.data.fields;

export default class PlayerDataModel extends BaseActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            background: new SchemaField({
                birthplace: new HTMLField({ required: true, blank: true }),
                earlyTraining: new HTMLField({ required: true, blank: true }),
                lifeEvents: new HTMLField({ required: true, blank: true }),
                definingMoment: new HTMLField({ required: true, blank: true }),
                additionalNotes: new HTMLField({ required: true, blank: true })
            })
        };
    }
}