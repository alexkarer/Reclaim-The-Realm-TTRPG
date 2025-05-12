const { HTMLField, NumberField, StringField } = foundry.data.fields;

export default class EquipmentDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            type: new StringField({ required: true, blank: true, initial: "" }),
            craftingSkills: new StringField({ required: true, blank: true, initial: "" }),
            tier: new NumberField({ required: true, integer: true, min: 0, initial: 0, max: 20 }),
            weight: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            price: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            description: new HTMLField({ required: true, blank: true })
        };
    }
}