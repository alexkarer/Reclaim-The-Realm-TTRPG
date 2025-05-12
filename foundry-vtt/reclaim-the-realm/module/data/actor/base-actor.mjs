const { NumberField, StringField } = foundry.data.fields;

export default class BaseActorDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            resources: new SchemaField({
                hp: new SchemaField({
                    min: new NumberField({ required: true, integer: true, min: 1, initial: 0 }),
                    value: new NumberField({ required: true, integer: true, min: 1, initial: 10 }),
                    max: new NumberField({ required: true, integer: true, min: 1, initial: 10 })
                }),
                tempHp: new SchemaField({
                    min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                    value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                    max: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
                })
            }),
            alignment: new StringField({
                required: true,
                blank: false,
                options: ["-", "unaligned", "lawful good", "lawful neutral", "lawful evil", "neutral good", "true neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil"],
                initial: "-"
            }),
            levels: new SchemaField({
                level: new NumberField({ required: true, integer: false, min: 0.125, initial: 1, max: 20 }),
                martialLevel: new NumberField({ required: true, integer: false, min: 0, initial: 0, max: 20 }),
                spellLevel: new NumberField({ required: true, integer: false, min: 0, initial: 0, max: 20 })
            }),
            ap: new NumberField({ required: true, integer: true, min: 1, initial: 3, max: 8 }),
            mp: new NumberField({ required: true, integer: false, min: 1, initial: 6, max: 20 }),
            attributes: new SchemaField({
                str: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                agi: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                con: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                int: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                spi: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                per: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 }),
                cha: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 20 })
            }),
            defenses: new SchemaField({
                stability: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 40 }),
                dodge: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 40 }),
                toughness: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 40 }),
                willpower: new NumberField({ required: true, integer: false, min: -6, initial: 0, max: 40 }),
            })
        };
    }
}