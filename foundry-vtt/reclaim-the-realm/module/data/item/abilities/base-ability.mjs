import RtRItemBase from "../base-item.mjs";

export default class RtRAbilityBase extends RtRItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        return schema;
    }
}