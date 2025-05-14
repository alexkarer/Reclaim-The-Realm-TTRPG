import BaseAbilityDataModel from './base-ability.mjs';

export default class RtRClassTechnique extends BaseAbilityDataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        return schema;
    }
}
