import RtRItemBase, { RtRItemBaseSchema } from "./base-item";

export interface RtRAbilitySchema extends RtRItemBaseSchema {
	tags: foundry.data.fields.ArrayField<foundry.data.fields.StringField>;
	requirements: foundry.data.fields.SchemaField<RtRAbilityRequirementsSchema>;
	usageCost: foundry.data.fields.SchemaField<RtRAbilityUsageCostSchema>;
	range: foundry.data.fields.StringField;
	targets: foundry.data.fields.StringField;
	duration: foundry.data.fields.StringField;
	actions: foundry.data.fields.SchemaField<RtRAbilityActionsSchema>;
	formula: foundry.data.fields.StringField;
}

export interface RtRAbilityRequirementsSchema extends foundry.data.fields.DataSchema {
	minimumLevel: foundry.data.fields.NumberField;
	minimumMartialLevel: foundry.data.fields.NumberField;
	minimumSpellLevel: foundry.data.fields.NumberField;

	minimumStr: foundry.data.fields.NumberField;
	minimumAgi: foundry.data.fields.NumberField;
	minimumCon: foundry.data.fields.NumberField;
	minimumInt: foundry.data.fields.NumberField;
	minimumSpi: foundry.data.fields.NumberField;
	minimumPer: foundry.data.fields.NumberField;
	minimumCha: foundry.data.fields.NumberField;

	requiredSpellDisciplineOne: foundry.data.fields.StringField;
	requiredSpellDisciplineTwo: foundry.data.fields.StringField;
	requiredMartialManeuverType: foundry.data.fields.StringField;

	skillRankRequirement: foundry.data.fields.SchemaField<RtRAbilityRequirementsSkillRankSchema>;

	requiredClass: foundry.data.fields.StringField;
	requiredPerk: foundry.data.fields.StringField;

	otherRequirements: foundry.data.fields.StringField;
}

export interface RtRAbilityRequirementsSkillRankSchema extends foundry.data.fields.DataSchema {
	skill: foundry.data.fields.StringField;
	rank: foundry.data.fields.NumberField;
}

export interface RtRAbilityUsageCostSchema extends foundry.data.fields.DataSchema {
	isFree: foundry.data.fields.BooleanField;
	apCost: foundry.data.fields.NumberField;
	mpCost: foundry.data.fields.NumberField;
	arcanaCost: foundry.data.fields.NumberField;
	staminaCost: foundry.data.fields.NumberField;
	classResourceName: foundry.data.fields.StringField;
	classResourceCost: foundry.data.fields.NumberField;
	otherResourceCost: foundry.data.fields.StringField;
}

export interface RtRAbilityActionsSchema extends foundry.data.fields.DataSchema {
	actionType: foundry.data.fields.StringField;
	rollBonus: foundry.data.fields.NumberField;
	fixed: foundry.data.fields.BooleanField;
	fixedValue: foundry.data.fields.NumberField;
	attribute: foundry.data.fields.StringField;
	targetingSave: foundry.data.fields.StringField;
	targets: foundry.data.fields.StringField;
	targetsAreaSize: foundry.data.fields.StringField;
	rangeType: foundry.data.fields.StringField;
	range: foundry.data.fields.NumberField;
	results: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<RtRAbilityActionsResultSchema>>;
}

export interface RtRAbilityActionsResultSchema extends foundry.data.fields.DataSchema {
	condition: foundry.data.fields.StringField;
	type: foundry.data.fields.StringField;
	damageCalculationMethod: foundry.data.fields.StringField;
	damageFormula: foundry.data.fields.StringField;
	damageBonus: foundry.data.fields.StringField;
	halfDamage: foundry.data.fields.BooleanField;
	damageType: foundry.data.fields.StringField;
	statusEffectToApply: foundry.data.fields.StringField;
	statusEffectDurationType: foundry.data.fields.StringField;
	statusEffectDuration: foundry.data.fields.NumberField;
	healFormula: foundry.data.fields.StringField;
	healTHP: foundry.data.fields.BooleanField
	additionalEffects: foundry.data.fields.StringField;

}

export default class RtRAbility<T extends RtRAbilitySchema> extends RtRItemBase<T> {
	static LOCALIZATION_PREFIXES = [
		...super.LOCALIZATION_PREFIXES,
		'RTR.Item.Ability',
	];

	static defineSchema() {
		const fields = foundry.data.fields;
		const requiredInteger = { required: true, nullable: false, integer: true };
		const requiredStringField = { required: true, nullable: false, blank: false };
		const schema = super.defineSchema();

		return {
			...super.defineSchema(),
			tags: new fields.ArrayField(new fields.StringField(requiredStringField)),
			requirements: new fields.SchemaField({
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
			}),
			usageCost: new fields.SchemaField({
				isFree: new fields.BooleanField({ initial: false, required: true, nullable: false }),
				apCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				mpCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				arcanaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				staminaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				classResourceName: new fields.StringField({ blank: true, choices: [...Object.keys(CONFIG.RTR.classResources), ''] }),
				classResourceCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				otherResourceCost: new fields.StringField({ initial: '', blank: true })
			}),
			range: new fields.StringField(),
			targets: new fields.StringField(),
			duration: new fields.StringField(),
			actions: new fields.ArrayField(
				new fields.SchemaField({
					actionType: new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityActionType), initial: Object.keys(CONFIG.RTR.abilityActionType)[0] }),
					rollBonus: new fields.NumberField(),
					fixed: new fields.BooleanField({ initial: false, required: true, nullable: false }),
					fixedValue: new fields.NumberField(),
					attribute: new fields.StringField({ choices: Object.keys(CONFIG.RTR.attributes) }), // needed for marital/spell test
					targetingSave: new fields.StringField({ choices: ['STABILITY', 'DODGE', 'TOUGHNESS', 'WILLPOWER'] }),
					targets: new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityTargetTypes), initial: Object.keys(CONFIG.RTR.abilityTargetTypes)[0] }),
					targetsAreaSize: new fields.NumberField(),
					rangeType: new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.abilityRangeType), initial: Object.keys(CONFIG.RTR.abilityRangeType)[0] }),
					range: new fields.NumberField(),
					results: new fields.ArrayField(
						new fields.SchemaField({
							condition: new fields.StringField({ choices: Object.keys(CONFIG.RTR.abilityResultCondition) }),
							type: new fields.StringField({ choices: Object.keys(CONFIG.RTR.abilityResultType) }),
							damageCalculationMethod: new fields.StringField({ choices: Object.keys(CONFIG.RTR.abilityDamageCalculationMethod) }),
							damageFormula: new fields.StringField(),
							damageBonus: new fields.StringField(),
							halfDamage: new fields.BooleanField({ initial: false, required: true, nullable: false }),
							damageType: new fields.StringField({ choices: Object.keys(CONFIG.RTR.damageTypes) }),
							statusEffectToApply: new fields.StringField({ choices: [...Object.keys(CONFIG.RTR.statusEffects), ''] }),
							statusEffectDurationType: new fields.StringField({ choices: Object.keys(CONFIG.RTR.abilityDurationTypes), initial: Object.keys(CONFIG.RTR.abilityDurationTypes)[0] }),
							statusEffectDuration: new fields.NumberField(),
							healFormula: new fields.StringField(),
							healTHP: new fields.BooleanField({ initial: false, required: true, nullable: false }),
							additionalEffects: new fields.StringField()
						})
					)
				})
			),
			formula: new fields.StringField({ blank: true })
		};
	}

	prepareDerivedData() {
		super.prepareDerivedData();
		// Build the formula dynamically using string interpolation
	}
}