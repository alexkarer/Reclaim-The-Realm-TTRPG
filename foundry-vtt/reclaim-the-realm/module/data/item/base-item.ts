export default class RtRItemBase extends foundry.abstract.TypeDataModel<{}, any> {

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

  prepareDerivedData() {
    this
  }
}