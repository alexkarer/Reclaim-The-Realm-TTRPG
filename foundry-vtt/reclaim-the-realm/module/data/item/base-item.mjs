export default class RtRItemBase extends foundry.abstract.TypeDataModel {

  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
  ];
  
  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.HTMLField();

    return schema;
  }
}
