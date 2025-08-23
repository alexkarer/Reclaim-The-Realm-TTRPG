export interface RtRItemBaseSchema extends foundry.data.fields.DataSchema {
    editLock: foundry.data.fields.BooleanField;
    description: foundry.data.fields.HTMLField;
}

export default class RtRItemBase<T extends RtRItemBaseSchema> extends foundry.abstract.TypeDataModel<T, any> {

  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      editLock: new fields.BooleanField({ initial: true, required: true, nullable: false }),
      description: new fields.HTMLField()
    };
  }
}