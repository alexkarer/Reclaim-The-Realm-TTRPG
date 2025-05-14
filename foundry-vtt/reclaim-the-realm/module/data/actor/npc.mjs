import RtRActorBase from "./base-actor.mjs";

export default class RtRNPC extends RtRActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.description = new fields.HTMLField({ required: true, blank: true });
    schema.level = new fields.NumberField({ required: true, nullable: false, integer: false, min: 0.125, initial: 1, max: 20 });
    schema.xpReward = new fields.NumberField({ ...requiredInteger, min: 0, initial: 0 });
    
    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    this.xpReward = this.level * 5;
  }
}