import RtRItemBase, { RtRItemBaseSchema } from "./base-item";

export interface RtRSpeciesSchema extends RtRItemBaseSchema {
  startingBonusHP: foundry.data.fields.NumberField;
  physicalCharacteristics: foundry.data.fields.SchemaField<RtRPhysicalCharacteristicsSchema>;
}

export interface RtRPhysicalCharacteristicsSchema extends foundry.data.fields.DataSchema {
  size: foundry.data.fields.StringField;
  height: foundry.data.fields.StringField;
  weight: foundry.data.fields.StringField;
}

export default class RtRSpecies extends RtRItemBase<RtRSpeciesSchema> {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.Species',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredStringField = { required: true, nullable: false, blank: false };
    return {
      ...super.defineSchema(),
      startingBonusHP: new fields.NumberField({ ...requiredInteger, initial: 8, min: 0 }),
      physicalCharacteristics: new fields.SchemaField({
        size: new fields.StringField({ ...requiredStringField, initial: 'Medium' }),
        height: new fields.StringField({ ...requiredStringField, initial: 'x cm + xdx cm' }),
        weight: new fields.StringField({ ...requiredStringField, initial: 'x kg + xdx kg' })
      })
    };
  }
}
