import RtRItemBase from "../base-item.mjs";

export default class RtREquipment extends RtRItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        schema.type = new fields.StringField({ required: true, blank: true, initial: "" });
        schema.craftingSkills = new fields.StringField({ required: true, blank: true, initial: "" });
        schema.tier = new fields.NumberField({ required: true, integer: true, min: 0, initial: 0, max: 20 });
        schema.weight = new fields.NumberField({ required: true, integer: true, min: 0, initial: 0 });
        schema.price = new fields.NumberField({ required: true, integer: true, min: 0, initial: 0 });
        schema.description = new fields.HTMLField({ required: true, blank: true });

        return schema;
    }
}