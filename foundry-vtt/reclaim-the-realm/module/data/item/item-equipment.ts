import RtRItemBase, { RtRItemBaseSchema } from "./base-item";

export interface RtREquipmentSchema extends RtRItemBaseSchema {
    tier: foundry.data.fields.NumberField;
    craftingSkills: foundry.data.fields.StringField;
    type: foundry.data.fields.StringField;

    costBc: foundry.data.fields.NumberField;
    quantity: foundry.data.fields.NumberField;

    weightKg: foundry.data.fields.NumberField;
    weightGramm: foundry.data.fields.NumberField;
    totalWeightGramm: foundry.data.fields.NumberField;

    damage: foundry.data.fields.StringField;

    availableWeapons: foundry.data.fields.StringField;
    recoverable: foundry.data.fields.BooleanField;

    damageBlock: foundry.data.fields.NumberField;
    manoeuvrePenalty: foundry.data.fields.NumberField;
    movementPenalty: foundry.data.fields.NumberField;

    shieldBlock: foundry.data.fields.NumberField;
    damageThreshold: foundry.data.fields.NumberField;
}

export default class RtREquipment extends RtRItemBase<RtREquipmentSchema> {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.Equipment',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        return {
            ... super.defineSchema(),
            tier: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
            craftingSkills: new fields.StringField(),
            type: new fields.StringField({ choices: Object.keys(CONFIG.RTR.equipmentTypes), initial: 'commodity' }),

            costBc: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            quantity: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),

            weightKg: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            weightGramm: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            totalWeightGramm: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

            damage: new fields.StringField(),

            availableWeapons: new fields.StringField();
            recoverable: new fields.BooleanField({ initial: false, required: true, nullable: false }),

            damageBlock: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            manoeuvrePenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            movementPenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

            shieldBlock: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            damageThreshold: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        this.totalWeightGramm = (this.weightKg?.valueOf() ?? 0) * 1000 + (this.weightGramm?.valueOf() ?? 0);
    }
}
