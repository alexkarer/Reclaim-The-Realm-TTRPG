import RtRAbility from './item-ability';

export default class RtRSpell extends RtRAbility {
    static LOCALIZATION_PREFIXES = [
        ...super.LOCALIZATION_PREFIXES,
        'RTR.Item.Spell',
    ];

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        return {
            ...super.defineSchema(),
            spellDifficulty: new fields.NumberField({ ...requiredInteger, initial: 6, min: 0 }),
            components: new fields.StringField()
        };
    }
}
