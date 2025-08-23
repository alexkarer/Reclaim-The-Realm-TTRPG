import RtRItemBase from "./base-item";

export default class RtRSpecies extends RtRItemBase {
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
            size: new fields.StringField({...requiredStringField, initial: 'Medium'}),
            height: new fields.StringField({...requiredStringField, initial: 'x cm + xdx cm'}),
            weight: new fields.StringField({...requiredStringField, initial: 'x kg + xdx kg'})
        })
    };
  }
}
