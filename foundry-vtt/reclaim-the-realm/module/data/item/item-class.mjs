import RtRItemBase from './base-item.mjs';

export default class RtRClass extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    'RTR.Item.base',
    'RTR.Item.Class',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredStringField = { required: true, nullable: false, blank: false };
    const proficiency = { choices: [0, 0.34, 0.67, 1] };
    const schema = super.defineSchema();

    schema.classCoreFeatureName = new fields.StringField({...requiredStringField, initial: 'Change Me'});

    schema.hpPerLevel = new fields.NumberField({ ...requiredInteger, initial: 6, min: 1 });

    schema.martialLevelProgression = new fields.AlphaField({ ...proficiency, initial: 0 });
    schema.knownMartialManeuverTypes = new fields.StringField();

    schema.spellLevelProgression = new fields.AlphaField({ ...proficiency, initial: 0 });
    schema.knownSpellDisciplines = new fields.StringField();

    schema.stabilityProficiency = new fields.AlphaField({ ...proficiency, initial: 0 });
    schema.dodgeProficiency = new fields.AlphaField({ ...proficiency, initial: 0 });
    schema.toughnessProficiency = new fields.AlphaField({ ...proficiency, initial: 0 });
    schema.willpowerProficiency = new fields.AlphaField({ ...proficiency, initial: 0 });

    schema.classAttributes = new fields.ArrayField(
        new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.attributes)})
    );
    schema.classSkills = new fields.ArrayField(
        new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.skills)})
    );

    // Use for now as a Crutch until proper implemented
    schema.classAttributesString = new fields.StringField({...requiredStringField, initial: 'Change Me'});
    schema.classSkillsString = new fields.StringField({...requiredStringField, initial: 'Change Me'});

    schema.skillPointsPerLevel = new fields.NumberField({ ...requiredInteger, initial: 4, min: 1 });

    return schema;
  }
}
