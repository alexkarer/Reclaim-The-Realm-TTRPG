import RtRActorBase from "./base-actor.mjs";

export default class RtRPlayer extends RtRActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.xp = new fields.NumberField({ requiredInteger, min: 0, initial: 0 });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    // calculate level based of xp
  }
}