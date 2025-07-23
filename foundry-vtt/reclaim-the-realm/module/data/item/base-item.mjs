export default class RtRItemBase extends foundry.abstract.TypeDataModel {

  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
  ];
  
  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.editLock = new fields.BooleanField({ initial: true, required: true, nullable: false });
    schema.description = new fields.HTMLField();

    return schema;
  }
}
