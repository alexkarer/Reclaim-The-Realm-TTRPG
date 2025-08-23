import { getApForLevel } from "../../helpers/actor-helper";
import { RTR } from "../../helpers/config";

export interface RtRActorBaseSchema extends foundry.data.fields.DataSchema {
	hp: foundry.data.fields.SchemaField<RtRActorResourceSchema>;
	tempHp: foundry.data.fields.NumberField;

	exhaustion: foundry.data.fields.NumberField;
	ap: foundry.data.fields.NumberField;
	mp: foundry.data.fields.NumberField;

	biography: foundry.data.fields.HTMLField;
	alignment: foundry.data.fields.StringField;
	editLock: foundry.data.fields.BooleanField;

	data: foundry.data.fields.SchemaField<RtRActorDataSchema>;
	levels: foundry.data.fields.SchemaField<RtRActorLevelsSchema>;
	attributes: foundry.data.fields.SchemaField<RtRActorAttributesSchema>;
	defenses: foundry.data.fields.SchemaField<RtRActorDefensesSchema>;
	resistances: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField<RtRActorResistanceSchema>>;
	attackBonuses: foundry.data.fields.SchemaField<RtRActorAttackBonusesSchema>;
	skills: foundry.data.fields.SchemaField<RtRActorSkillsSchema>;
}

export interface RtRActorResourceSchema extends foundry.data.fields.DataSchema {
	value: foundry.data.fields.NumberField;
	max: foundry.data.fields.NumberField;
}

export interface RtRActorDataSchema extends foundry.data.fields.DataSchema {
	hpPerLevel: foundry.data.fields.NumberField;
	additionalHp: foundry.data.fields.NumberField;

	stabilityBonus: foundry.data.fields.NumberField;
	dodgeBonus: foundry.data.fields.NumberField;
	toughnessBonus: foundry.data.fields.NumberField;
	willpowerBonus: foundry.data.fields.NumberField;

	movementBonus: foundry.data.fields.NumberField;

	manoeuvrePenalty: foundry.data.fields.NumberField;
	movementPenalty: foundry.data.fields.NumberField;
}

export interface RtRActorLevelsSchema extends foundry.data.fields.DataSchema {
	level: foundry.data.fields.NumberField;
	martialLevel: foundry.data.fields.NumberField;
	spellLevel: foundry.data.fields.NumberField;
	martialProficency: foundry.data.fields.AlphaField;
	spellProficency: foundry.data.fields.AlphaField;
}

export interface RtRActorAttributesSchema extends foundry.data.fields.DataSchema {

}

export interface RtRActorDefensesSchema extends foundry.data.fields.DataSchema {
	stabilityProficency: foundry.data.fields.AlphaField;
	dodgeProficency: foundry.data.fields.AlphaField;
	toughnessProficency: foundry.data.fields.AlphaField;
	willpowerProficency: foundry.data.fields.AlphaField;

	shieldBlockBase: foundry.data.fields.NumberField;
	shieldBlockThreshold: foundry.data.fields.NumberField;

	stability: foundry.data.fields.NumberField;
	dodge: foundry.data.fields.NumberField;
	toughness: foundry.data.fields.NumberField;
	willpower: foundry.data.fields.NumberField;
	shieldBlock: foundry.data.fields.NumberField;
}

export interface RtRActorResistanceSchema extends foundry.data.fields.DataSchema {
	damageType: foundry.data.fields.StringField;
	value: foundry.data.fields.NumberField;
}

export interface RtRActorAttackBonusesSchema extends foundry.data.fields.DataSchema {
	meleeMartialAttack: foundry.data.fields.NumberField;
	rangedMartialAttack: foundry.data.fields.NumberField;
	meleeSpellAttack: foundry.data.fields.NumberField;
	rangedSpellAttack: foundry.data.fields.NumberField;
}

export interface RtRActorSkillsSchema extends foundry.data.fields.DataSchema {
}

export default class RtRActorBase<T extends RtRActorBaseSchema> extends foundry.abstract.TypeDataModel<T, any> {
	static LOCALIZATION_PREFIXES = ["RTR.Actor.base"];

	/** @override */
	static defineSchema() {
		const fields = foundry.data.fields;
		const requiredInteger = { required: true, nullable: false, integer: true };
		const proficiency = { choices: [0, 0.17, 0.34, 0.67, 1] };
		const requiredStringField = { required: true, nullable: false, blank: false };
		return {
			hp: new fields.SchemaField({
				value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
				max: new fields.NumberField({ ...requiredInteger, initial: 10, min: 1 }),
			}),
			tempHp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
			exhaustion: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
			ap: new fields.NumberField({ ...requiredInteger, initial: 3 }),
			mp: new fields.NumberField({ ...requiredInteger, initial: 6 }),
			biography: new fields.HTMLField(),
			alignment: new fields.StringField({ blank: false, initial: 'lawful good', choices: ['unaligned', 'lawful good', 'lawful neutral', 'lawful evil', 'neutral good', 'true neutral', 'neutral evil', 'chaotic good', 'chaotic neutral', 'chaotic evil'] }),
			editLock: new fields.BooleanField({ initial: true, required: true, nullable: false }),
			data: new fields.SchemaField({
				hpPerLevel: new fields.NumberField({ ...requiredInteger, initial: 6, min: 1 }),
				additionalHp: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

				stabilityBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				dodgeBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				toughnessBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				willpowerBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

				movementBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

				manoeuvrePenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				movementPenalty: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
			}),
			levels: new fields.SchemaField({
				level: new fields.NumberField({ required: true, nullable: false, integer: false, initial: 1, min: 0.125 }),
				martialLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				spellLevel: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				martialProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
				spellProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
			}),
			attributes: new fields.SchemaField(
				Object.keys(RTR.attributes).reduce((obj: {}, attr) => {
					obj[attr]: new fields.SchemaField({
						value: new fields.NumberField({ ...requiredInteger, initial: -2, min: -8 }),
						classAttribute: new fields.BooleanField({ initial: false, required: true, nullable: false }),
						attributeMaximum: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3 }),
						tempReduction: new fields.NumberField({ ...requiredInteger, initial: 0 })
					});
					return obj;
				}, {})
			),
			defenses: new fields.SchemaField({
				stabilityProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
				dodgeProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
				toughnessProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),
				willpowerProficency: new fields.AlphaField({ ...proficiency, initial: 0 }),

				shieldBlockBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
				shieldBlockThreshold: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),

				stability: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				dodge: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				toughness: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				willpower: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				shieldBlock: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
			}),
			resistances: new fields.ArrayField(
				new fields.SchemaField({
					damageType: new fields.StringField({ ...requiredStringField, choices: Object.keys(CONFIG.RTR.damageTypes) }),
					value: new fields.NumberField({ ...requiredInteger, min: 1 }),
				})
			),
			attackBonuses: new fields.SchemaField({
				meleeMartialAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				rangedMartialAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				meleeSpellAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
				rangedSpellAttack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
			}),
			skills: new fields.SchemaField(
				Object.keys(CONFIG.RTR.skills).reduce((obj, skill) => {
					obj[skill]: new fields.SchemaField({
						rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
						classSkill: new fields.BooleanField({ initial: false, required: true, nullable: false }),
						rankMaximum: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
						attrBonus: new fields.StringField({ ...requiredStringField, initial: 'str', choices: Object.keys(CONFIG.RTR.attributes) })
					});
					return obj;
				}, {})
			)
		};
	}

	/** @override */
	prepareBaseData() {
		super.prepareBaseData();

		for (const key in this.skills) {
			this.skills[key].rankMaximum = this.levels.level + (this.skills[key].classSkill ? 2 : 0);
		}

		for (const key in this.attributes) {
			this.attributes[key].attributeMaximum = 3 + (this.attributes[key].classAttribute ? 2 : 0) + Math.floor(((this.levels.level?.valueOf() ?? 0) - 1) * 0.5);
		}

		this.levels.martialLevel = Math.floor(this.levels.martialProficency * (this.levels.level?.valueOf() ?? 0));
		this.levels.spellLevel = Math.floor(this.levels.spellProficency * (this.levels.level?.valueOf() ?? 0));
		this.ap = getApForLevel(this.levels.level?.valueOf() ?? 0);
	}

	/** @override */
	prepareDerivedData() {
		super.prepareDerivedData();
		for (let [k, v] of Object.entries(this.attributes)) {
			v.value += v.tempReduction;
		}

		this.mp = 6 + Math.floor(this.attributes.agi.value / 3) + (this.data.movementBonus?.valueOf() ?? 0) - (this.data.movementBonus?.valueOf() ?? 0);

		this.defenses.stability = Math.floor(this.defenses.stabilityProficency * (this.levels.level?.valueOf() ?? 0)) + this.attributes.str.value + this.data.stabilityBonus;
		this.defenses.dodge = Math.floor(this.defenses.dodgeProficency * (this.levels.level?.valueOf() ?? 0)) + this.attributes.agi.value + this.data.dodgeBonus - this.data.manoeuvrePenalty;
		this.defenses.toughness = Math.floor(this.defenses.toughnessProficency * (this.levels.level?.valueOf() ?? 0)) + this.attributes.con.value + this.data.toughnessBonus;
		this.defenses.willpower = Math.floor(this.defenses.willpowerProficency * (this.levels.level?.valueOf() ?? 0)) + this.attributes.spi.value + this.data.willpowerBonus;
		this.defenses.shieldBlock = (this.levels.martialLevel?.valueOf() ?? 0) + (this.defenses.shieldBlockBase?.valueOf() ?? 0);

		this.attackBonuses.meleeMartialAttack = this.levels.martialLevel + this.attributes.agi.value;
		this.attackBonuses.rangedMartialAttack = this.levels.martialLevel + this.attributes.per.value;
		this.attackBonuses.meleeSpellAttack = this.levels.spellLevel + this.attributes.agi.value;
		this.attackBonuses.rangedSpellAttack = this.levels.spellLevel + this.attributes.per.value;
	}

	/** @override */
	getRollData() {
		const data = {
			level: this.levels.level,

			d20Test: -(this.exhaustion?.valueOf() ?? 0)
			martialTest: this.levels.martialLevel,
			spellTest: this.levels.spellLevel,

			stabilitySave: this.defenses.stability,
			dodgeSave: this.defenses.dodge,
			toughnessSave: this.defenses.toughness,
			willpowerSave: this.defenses.willpower,
			shieldBlock: this.defenses.shieldBlock,

			meleeMartialAttack: this.attackBonuses.meleeMartialAttack,
			rangedMartialAttack: this.attackBonuses.rangedMartialAttack,
			meleeSpellAttack: this.attackBonuses.meleeSpellAttack,
			rangedSpellAttack: this.attackBonuses.rangedSpellAttack,

			manoeuvrePenalty = this.data.manoeuvrePenalty
		};

		for (let [k, v] of Object.entries(this.attributes)) {
			data[k] = foundry.utils.deepClone(v);
		}

		for (let [k, v] of Object.entries(this.skills)) {
			data[k] = foundry.utils.deepClone(v);
		}

		return data;
	}
}
