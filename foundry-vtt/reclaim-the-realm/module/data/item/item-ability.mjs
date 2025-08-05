import RtRItemBase from './base-item.mjs';

export default class RtRAbility extends RtRItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'RTR.Item.Ability',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredStringField = { required: true, nullable: false, blank: false };
    const schema = super.defineSchema();

    schema.tags = new fields.ArrayField(new fields.StringField(requiredStringField));

    schema.requirements = new fields.SchemaField({
      minimumLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumMartialLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumSpellLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      minimumStr: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumAgi: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumCon: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumInt: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumSpi: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumPer: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      minimumCha: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

      requiredSpellDisciplineOne: new fields.StringField({ nullable: true, blank: true, choices: [...Object.keys(CONFIG.RTR.spellDisciplines), ''] }),
      requiredSpellDisciplineTwo: new fields.StringField({ nullable: true, blank: true, choices: [...Object.keys(CONFIG.RTR.spellDisciplines), ''] }),
      requiredMartialManeuverType: new fields.StringField({ nullable: true, choices: [...Object.keys(CONFIG.RTR.martialManeuverTypes), ''] }),

      skillRankRequirement: new fields.SchemaField({
        skill: new fields.StringField(),
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
      }),

      requiredClass: new fields.StringField(),
      requiredPerk: new fields.StringField(),

      otherRequirements: new fields.StringField()
    });

    schema.usageCost = new fields.SchemaField({
      isFree: new fields.BooleanField({ initial: false, required: true, nullable: false }),
      apCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      mpCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      arcanaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      staminaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      classResourceName: new fields.StringField({ blank: true, choices: [...Object.keys(CONFIG.RTR.classResources), ''] }),
      classResourceCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      otherResourceCost: new fields.StringField({initial: '', blank: true})
    });

    schema.range = new fields.StringField();
    schema.targets = new fields.StringField();
    schema.duration = new fields.StringField();

    schema.actions = new fields.ArrayField(
      new fields.SchemaField({
        actionType: new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityActionType), initial: Object.keys(CONFIG.RTR.abilityActionType)[0]}),
        attribute: new fields.StringField({choices: Object.keys(CONFIG.RTR.attributes)}), // needed for marital/spell test
        targetingSave: new fields.StringField({choices: ['STABILITY', 'DODGE', 'TOUGHNESS', 'WILLPOWER']}),
        targets: new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityTargetTypes), initial: Object.keys(CONFIG.RTR.abilityTargetTypes)[0]}),
        targetsAreaSize: new fields.NumberField(),
        rangeType: new fields.StringField({...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityRangeType), initial: Object.keys(CONFIG.RTR.abilityRangeType)[0]}),
        range: new fields.NumberField(),
        results: new fields.ArrayField(
          new fields.SchemaField({
            condition: new fields.StringField({choices: Object.keys(CONFIG.RTR.abilityResultCondition)}),
            type: new fields.StringField({choices: Object.keys(CONFIG.RTR.abilityResultType)}),
            damageCalculationMethod: new fields.StringField({choices: Object.keys(CONFIG.RTR.abilityDamageCalculationMethod)}),
            damageFormula: new fields.StringField(),
            halfDamage: new fields.BooleanField({initial: false, required: true, nullable: false}),
            damageType: new fields.StringField({choices: Object.keys(CONFIG.RTR.damageTypes)}),
            statusEffectToApply: new fields.StringField({choices: [...Object.keys(CONFIG.RTR.statusEffects), '']}),
            statusEffectDurationType: new fields.StringField({choices: Object.keys(CONFIG.RTR.abilityDurationTypes), initial: Object.keys(CONFIG.RTR.abilityDurationTypes)[0]}),
            statusEffectDuration: new fields.NumberField(),
            healFormula: new fields.StringField(),
            additionalEffects: new fields.StringField()
          })
        )
      })
    );

    // formula that can be used for custom Rolls
    schema.formula = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    // Build the formula dynamically using string interpolation
    
  }
}
