import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { NPC, LevelConfig, CreatureType, CreatureSize, Trait, Ability, Reaction, Attributes, CreatureSubType, ArcheTypeProgression } from './npc';
import { Alignment } from './alignments';
import * as helpers from './npc-repository-helpers';

import creatureTypesJson from '../../resources/creature_types.json'; 
import sizesJson from '../../resources/sizes.json'; 
import levelsJson from '../../resources/levels.json';
import archeTypesJson from '../../resources/archetypes.json'; 
import traitsJson from '../../resources/traits.json';

const npcStore = createStore(
    { name: 'npc'},
    withProps<NPC>({ 
        name: '',
        biography: '',
        alignment: Alignment.Unaligned,

        levelConfig: levelsJson[0],
        archeTypeProgression: archeTypesJson.warriorProgression,
        creatureType: creatureTypesJson[0],
        creatureSubType: creatureTypesJson[0].availibleSubTypes[0],
        freeCreatureTrait: undefined,
        freeSubCreatureTrait: traitsJson.creatureTypeSpecificTraits[0],
        creatureSize: sizesJson[2],
        specialMovement: [],

        mpBonus: 0,
        additionalNpcCreationPoints: 0,
        baseHpBonus: 0,
        hpPerLevelBonuses: 0,

        strBonus: 0,
        agiBonus: 0,
        conBonus: 0,
        intBonus: 0,
        spiBonus: 0,
        perBonus: 0,
        chaBonus: 0,

        strAttributeBoost: 0,
        agiAttributeBoost: 0,
        conAttributeBoost: 0,
        intAttributeBoost: 0,
        spiAttributeBoost: 0,
        perAttributeBoost: 0,
        chaAttributeBoost: 0,

        stabilityBonus: 0,
        dodgeBonus: 0,
        toughnessBonus: 0,
        willpowerBonus: 0,

        additionalResistances: [],
        additionalImmunities: [],
        additionalVulnurabilities: [],
        additionalStatusEffectImmunities: [],

        shieldBlock: 0,
        shieldThreshold: 0,

        preDefinedAbilities: [],
        customAbilities: [],
        reactions: [],

        traits: [],
        loot: []
     })
);

@Injectable({providedIn: 'root'})
export class NpcRepository {
    $name = npcStore.pipe(select(state => state.name === '' ? 'Name' : state.name));
    $alignment = npcStore.pipe(select(state => state.alignment));
    $availibleNpcCreationPoints = npcStore.pipe(select(state => helpers.calcualteNPCCreationPoints(state)));
    $usedNpcCreationPoints = npcStore.pipe(select(state => 
        state.creatureSize.pointsCost + 
        state.creatureType.pointsCost + 
        state.creatureSubType.pointsCost + 
        state.traits.map(t => t.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.customAbilities.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.preDefinedAbilities.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0) +
        state.reactions.map(a => a.pointsCost).reduce(((p1, p2) => p1 + p2), 0)
    ));

    $level = npcStore.pipe(select(state => state.levelConfig.level));
    $xp = npcStore.pipe(select(state => state.levelConfig.XP));
    $martialLevel = npcStore.pipe(select(state => helpers.calculateMartialLevel(state)));
    $spellLevel = npcStore.pipe(select(state => helpers.calculateSpellLevel(state)));

    $creatureType = npcStore.pipe(select(state => state.creatureType.name));
    $avilibleSubTypes = npcStore.pipe(select(state => state.creatureType.availibleSubTypes));
    $creatureSubType = npcStore.pipe(select(state => state.creatureSubType.name));
    $creatureSize = npcStore.pipe(select(state => state.creatureSize.name));

    $ap = npcStore.pipe(select(state => state.levelConfig.AP));
    $mp = npcStore.pipe(select(state => 6 + state.mpBonus + Math.floor(helpers.calculateAgi(state)/3)));
    $specialMovement = npcStore.pipe(select(state => state.specialMovement.join(', ')));

    $str = npcStore.pipe(select(state => helpers.calculateStr(state)));
    $agi = npcStore.pipe(select(state => helpers.calculateAgi(state)));
    $con = npcStore.pipe(select(state => helpers.calculateCon(state)));
    $int = npcStore.pipe(select(state => helpers.calculateInt(state)));
    $spi = npcStore.pipe(select(state => helpers.calculateSpi(state)));
    $per = npcStore.pipe(select(state => helpers.calculatePer(state)));
    $cha = npcStore.pipe(select(state => helpers.calculateCha(state)));

    $strAttributeBoost = npcStore.pipe(select(state => state.strAttributeBoost));
    $agiAttributeBoost = npcStore.pipe(select(state => state.agiAttributeBoost));
    $conAttributeBoost = npcStore.pipe(select(state => state.conAttributeBoost));
    $intAttributeBoost = npcStore.pipe(select(state => state.intAttributeBoost));
    $spiAttributeBoost = npcStore.pipe(select(state => state.spiAttributeBoost));
    $perAttributeBoost = npcStore.pipe(select(state => state.perAttributeBoost));
    $chaAttributeBoost = npcStore.pipe(select(state => state.chaAttributeBoost));

    $meleeMartialAttack = npcStore.pipe(select(state => 10 + helpers.calculateAgi(state) + helpers.calculateMartialLevel(state)));
    $rangedMartialAttack = npcStore.pipe(select(state => 10 + helpers.calculatePer(state) + helpers.calculateMartialLevel(state)));
    $meleeSpellAttack = npcStore.pipe(select(state => 10 + helpers.calculateAgi(state) + helpers.calculateSpellLevel(state)));
    $rangedSpellAttack = npcStore.pipe(select(state => 10 + helpers.calculatePer(state) + helpers.calculateSpellLevel(state)));

    $hp = npcStore.pipe(select(state => helpers.calculateHp(state)));
    $stability = npcStore.pipe(select(state => helpers.calculateStability(state)));
    $dodge = npcStore.pipe(select(state => helpers.calculateDodge(state)));
    $toughness = npcStore.pipe(select(state => helpers.calculateToughness(state)));
    $willpower = npcStore.pipe(select(state => helpers.calculateWillpower(state)));
    $shieldBlock = npcStore.pipe(select(state =>  state.shieldBlock === 0 ? 0 : helpers.calculateMartialLevel(state) + state.shieldBlock));
    $shieldThreshold = npcStore.pipe(select(state => state.shieldThreshold));

    $damageResistances = npcStore.pipe(select(state => helpers.flattenDamageResistances(state)));
    $damageImmunities = npcStore.pipe(select(state => [...state.creatureType.damageImmunities, ...state.additionalImmunities].join(', ')));
    $statusEffectImmunties = npcStore.pipe(select(state => [...state.creatureType.statusEffectImmunities, ...state.additionalStatusEffectImmunities].join(', ')));
    $damageVulnurabilities = npcStore.pipe(select(state => [...state.creatureType.damageVulnurabilities, ...state.additionalVulnurabilities].join(', ')));

    $traits = npcStore.pipe(select(state => state.freeCreatureTrait === undefined ? state.traits : [...state.traits, state.freeCreatureTrait]));

    $customAbilities = npcStore.pipe(select(state => state.customAbilities));
    $allAbilities = npcStore.pipe(select(state => [...state.preDefinedAbilities, ...state.customAbilities]
        .map(a => ({
            name: a.name,
            pointsCost: a.pointsCost,
            apCost: a.apCost,
            mpCost: a.mpCost,
            description: a.description
                .replaceAll('[MEELE RANGE]', state.creatureSize.meleeRange)
                .replaceAll('[MELEE MARTIAL ATTACK]', 'Attack ⚔️ ' + (10 + helpers.calculateAgi(state) + helpers.calculateMartialLevel(state)))
                .replaceAll('[RANGED MARTIAL ATTACK]', 'Attack 🏹 ' + (10 + helpers.calculatePer(state) + helpers.calculateMartialLevel(state)))
                .replaceAll('[MELEE SPELL ATTACK]', 'Attack ⚔️✨ ' + (10 + helpers.calculateAgi(state) + helpers.calculateSpellLevel(state)))
                .replaceAll('[RANGED SPELL ATTACK]', 'Attack 🏹✨ ' + (10 + helpers.calculatePer(state) + helpers.calculateSpellLevel(state)))
                .replaceAll('[LIGHT MARTIAL DAMAGE]+3', helpers.getLightDamage(helpers.calculateStr(state)+3))
                .replaceAll('2*[LIGHT MARTIAL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateStr(state)), 2))
                .replaceAll('3*[LIGHT MARTIAL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateStr(state)), 3))
                .replaceAll('4*[LIGHT MARTIAL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateStr(state)), 4))
                .replaceAll('5*[LIGHT MARTIAL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateStr(state)), 5))
                .replaceAll('[LIGHT MARTIAL DAMAGE]', helpers.getLightDamage(helpers.calculateStr(state)))
                .replaceAll('[LIGHT SPELL DAMAGE]+3', helpers.getLightDamage(helpers.calculateSpi(state)+3))
                .replaceAll('2*[LIGHT SPELL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateSpi(state)), 2))
                .replaceAll('3*[LIGHT SPELL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateSpi(state)), 3))
                .replaceAll('4*[LIGHT SPELL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateSpi(state)), 4))
                .replaceAll('5*[LIGHT SPELL DAMAGE]', helpers.multiplyD6DiceExpressions(helpers.getLightDamage(helpers.calculateSpi(state)), 5))
                .replaceAll('[LIGHT SPELL DAMAGE]', helpers.getLightDamage(helpers.calculateSpi(state)))
                .replaceAll('[LIGHT SPELL DAMAGE]', helpers.getLightDamage(helpers.calculateSpi(state)))
                .replaceAll('[STR]', helpers.calculateStr(state).toString())
                .replaceAll('[AGI]', helpers.calculateAgi(state).toString())
                .replaceAll('[CON]', helpers.calculateCon(state).toString())
                .replaceAll('[INT]', helpers.calculateInt(state).toString())
                .replaceAll('[SPI]', helpers.calculateSpi(state).toString())
                .replaceAll('[PER]', helpers.calculatePer(state).toString())
                .replaceAll('[CHA]', helpers.calculateCha(state).toString())
                .replaceAll('[MARTIAL LEVEL]', helpers.calculateMartialLevel(state).toString())
                .replaceAll('[SPELL LEVEL]', helpers.calculateSpellLevel(state).toString())
                .replaceAll('[DEFAULT DURATION]', Math.max(2, Math.floor(state.levelConfig.level / 2)).toString())
        }))
    ));
    $reactions = npcStore.pipe(select(state => state.reactions));

    updateName(name: string) {
        npcStore.update(setProp('name', name));
    }

    updateAlignment(alignment: Alignment) {
        npcStore.update(setProp('alignment', alignment));
    }

    updateLevel(levelConfig: LevelConfig) {
        npcStore.update(setProp('levelConfig', levelConfig));
    }

    updateArcheType(archeTypeProgression: ArcheTypeProgression) {
        npcStore.update(setProp('archeTypeProgression', archeTypeProgression));
    }

    updateCreatureType(type: CreatureType) {
        let freeTrait = traitsJson.creatureTypeSpecificTraits.find(t => t.name === type.freeTrait);
        npcStore.update(setProp('freeCreatureTrait', existingFreeTrait => {
            //if (existingFreeTrait) { this.removeTraitsCharacteristics(existingFreeTrait.name); }
            return freeTrait;
        }));
        //if (freeTrait) { this.applyTraitsCharacteristics(freeTrait.name); }

        npcStore.update(setProp('creatureType', type));
        this.updateCreatureSubType(type.availibleSubTypes[0]);
    }

    updateCreatureSubType(subType: CreatureSubType) {
        let freeTrait = traitsJson.creatureTypeSpecificTraits.find(t => t.name === subType.freeTrait);
        npcStore.update(setProp('freeSubCreatureTrait', existingFreeTrait => {
            //if (existingFreeTrait) { this.removeTraitsCharacteristics(existingFreeTrait.name); }
            return freeTrait;
        }));
        //if (freeTrait) { this.applyTraitsCharacteristics(freeTrait.name); }

        npcStore.update(setProp('creatureSubType', subType));
    }

    updateCreatureSize(size: CreatureSize) {
        npcStore.update(setProp('creatureSize', size));
    }

    increaseAttributeBoost(attr: Attributes) {
        switch (attr) {
            case Attributes.STR: 
                npcStore.update(setProp('strAttributeBoost', boost => boost + 1));
                break;
            case Attributes.AGI:
                npcStore.update(setProp('agiAttributeBoost', boost => boost + 1));
                break;
            case Attributes.CON:
                npcStore.update(setProp('conAttributeBoost', boost => boost + 1));
                break;
            case Attributes.INT:
                npcStore.update(setProp('intAttributeBoost', boost => boost + 1));
                break;
            case Attributes.SPI:
                npcStore.update(setProp('spiAttributeBoost', boost => boost + 1));
                break;
            case Attributes.PER:
                npcStore.update(setProp('perAttributeBoost', boost => boost + 1));
                break;
            case Attributes.CHA:
                npcStore.update(setProp('chaAttributeBoost', boost => boost + 1));
                break;
        }
    }

    decreaseAttributeBoost(attr: Attributes) {
        switch (attr) {
            case Attributes.STR: 
                npcStore.update(setProp('strAttributeBoost', boost => boost - 1));
                break;
            case Attributes.AGI:
                npcStore.update(setProp('agiAttributeBoost', boost => boost - 1));
                break;
            case Attributes.CON:
                npcStore.update(setProp('conAttributeBoost', boost => boost - 1));
                break;
            case Attributes.INT:
                npcStore.update(setProp('intAttributeBoost', boost => boost - 1));
                break;
            case Attributes.SPI:
                npcStore.update(setProp('spiAttributeBoost', boost => boost - 1));
                break;
            case Attributes.PER:
                npcStore.update(setProp('perAttributeBoost', boost => boost - 1));
                break;
            case Attributes.CHA:
                npcStore.update(setProp('chaAttributeBoost', boost => boost - 1));
                break;
        }
    }

    addTrait(trait: Trait) {
        this.applyTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => [...traits, trait]));
    }

    removeTrait(trait: Trait) {
        this.removeTraitsCharacteristics(trait.name);
        npcStore.update(setProp('traits', traits => traits.filter(t => t.name !== trait.name)));
    }

    addCustomAbility(ability: Ability) {
        npcStore.update(setProp('customAbilities', existingAbilities => [...existingAbilities, ability]));
    }

    removeCustomAbility(ability: Ability) {
        npcStore.update(setProp('customAbilities', existingAbilities => existingAbilities.filter(a => a.name !== ability.name)));
    }

    addPreDefinedAbility(ability: Ability) {
        npcStore.update(setProp('preDefinedAbilities', existingAbilities => [...existingAbilities, ability]));
    }

    removePreDefinedAbility(ability: Ability) {
        npcStore.update(setProp('preDefinedAbilities', existingAbilities => existingAbilities.filter(a => a.name !== ability.name)));
    }

    addReaction(reaction: Reaction) {
        npcStore.update(setProp('reactions', existingReactions => [...existingReactions, reaction]));
    }

    removeReaction(reaction: Reaction) {
        npcStore.update(setProp('reactions', existingReactions => existingReactions.filter(r => r.name !== reaction.name)));
    }

    // trait characteristics functions
    private updateAvailibleNpcPoints(points: number) {
        npcStore.update(setProp('additionalNpcCreationPoints', p => p + points));
    }
    private updateMpBonus(mp: number) {
        npcStore.update(setProp('mpBonus', mpBonus => mpBonus + mp));
    }
    private addSpecialMovement(move: string) {
        npcStore.update(setProp('specialMovement', sm => [...sm, move]));
    }
    private removeSpecialMovement(move: string) {
        npcStore.update(setProp('specialMovement', sm => sm.filter(spec => spec !== move)));
    }
    private updateHpPerLevelBonus(hp: number) {
        npcStore.update(setProp('hpPerLevelBonuses', hpBonus => hpBonus + hp));
    }
    private addDamageResistance(dmgResistance: { type: string, value: string }) {
        npcStore.update(setProp('additionalResistances', dmg => [...dmg, dmgResistance]));
    }
    private removeDamageResistance(dmgResistance: { type: string, value: string }) {
        npcStore.update(setProp('additionalResistances', dmg => dmg.filter(d => !(d.type === dmgResistance.type && d.value === dmgResistance.value))));
    }
    private addDamageImmunity(dmgImmunity: string) {
        npcStore.update(setProp('additionalImmunities', dmg => [...dmg, dmgImmunity]));
    }
    private removeDamageImmunity(dmgImmunity: string) {
        npcStore.update(setProp('additionalImmunities', dmg => dmg.filter(d => d !== dmgImmunity)));
    }
    private addStatusEffectImmunity(statusEffectImmunity: string) {
        npcStore.update(setProp('additionalStatusEffectImmunities', sei => [...sei, statusEffectImmunity]));
    }
    private removeStatusEffectImmunity(statusEffectImmunity: string) {
        npcStore.update(setProp('additionalStatusEffectImmunities', sei => sei.filter(s => s !== statusEffectImmunity)));
    }
    private updateStabilityBonus(bonus: number) {
        npcStore.update(setProp('stabilityBonus', stabilityBonus => stabilityBonus + bonus));
    }
    private updateDodgeBonus(bonus: number) {
        npcStore.update(setProp('dodgeBonus', dodgeBonus => dodgeBonus + bonus));
    }
    private updateToughnessBonus(bonus: number) {
        npcStore.update(setProp('toughnessBonus', toughnessBonus => toughnessBonus + bonus));
    }
    private updateWillpowerBonus(bonus: number) {
        npcStore.update(setProp('willpowerBonus', willpowerBonus => willpowerBonus + bonus));
    }
    private setShield(shieldBlock: number, shieldThreshold: number) {
        npcStore.update(setProp('shieldBlock', block => shieldBlock));
        npcStore.update(setProp('shieldThreshold', threshold => shieldThreshold));
    }
    private updateBaseHpBonus(hp: number) {
        npcStore.update(setProp('baseHpBonus', hpBonus => hpBonus + hp));
    }
    private updateSpiBonus(spi: number) {
        npcStore.update(setProp('spiBonus', spiBonus => spiBonus + spi));
    }

    private applyTraitsCharacteristics(traitName: string) {
        switch(traitName) {
            case 'Human Versatility':
                this.updateAvailibleNpcPoints(1);
                break;
            case 'Elven Nimbleness':
                this.updateMpBonus(1);
                break;
            case 'Dwarven Nightvision':
                break;
            case 'Undead':
                break;
            case 'Fire Elemental':
                break;
            case 'Air Elemental':
                this.addSpecialMovement('fly(1.5m)');
                break;
            case 'Water Elemental':
                this.addSpecialMovement('swim(1.5m)');
                break;
            case 'Immortal':
                break;
            case 'Nimble I':
                this.updateMpBonus(1);
                break;
            case 'Nimble II':
                this.updateMpBonus(2);
                break;
            case 'Nimble III':
                this.updateMpBonus(3);
                break;
            case 'Fly I':
                this.addSpecialMovement('fly(1.5m)');
                break;
            case 'Fly II':
                this.addSpecialMovement('fly(3m)');
                break;
            case 'Fly III':
                this.addSpecialMovement('fly(4.5m)');
                break;
            case 'Tank I':
                this.updateBaseHpBonus(5);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Tank II':
                this.updateBaseHpBonus(10);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Tank III':
                this.updateBaseHpBonus(20);
                this.updateHpPerLevelBonus(2);
                break;
            case 'Stability I':
                this.updateStabilityBonus(2);
                break;
            case 'Stability II':
                this.updateStabilityBonus(2);
                break;
            case 'Dodge I':
                this.updateDodgeBonus(1);
                break;
            case 'Dodge II':
                this.updateDodgeBonus(1);
                break;
            case 'Toughness I':
                this.updateToughnessBonus(2);
                break;
            case 'Toughness II':
                this.updateToughnessBonus(2);
                break;
            case 'Willpower I':
                this.updateWillpowerBonus(2);
                break;
            case 'Willpower II':
                this.updateWillpowerBonus(2);
                break;
            case 'Natural Armor':
                this.addDamageResistance({ type: 'physical', value: '2 + [LEVEL]'});
                break;
            case 'Damage Resistance I':
                this.addDamageResistance({ type: 'custom', value: '5 + [HALF LEVEL]'});
                break;
            case 'Damage Resistance II':
                this.addDamageResistance({ type: 'custom', value: '15 + [LEVEL]'});
                break;
            case 'Damage Immunity':
                this.addDamageImmunity('custom');
                break;
            case 'Status Effect Resistance':
                break;
            case 'Status Effect Immunity':
                this.addStatusEffectImmunity('custom');
                break;
            case 'Armor I':
                this.updateDodgeBonus(-1);
                this.addDamageResistance({ type: 'physical', value: '2'});
                break;
            case 'Armor II':
                this.updateDodgeBonus(-3);
                this.addDamageResistance({ type: 'physical', value: '4'});
                break;
            case 'Armor III':
                this.updateDodgeBonus(-5);
                this.updateMpBonus(-1);
                this.addDamageResistance({ type: 'physical', value: '6'});
                break;
            case 'Small Shield':
                this.setShield(12, 15);
                break;
            case 'Medium Shield':
                this.updateDodgeBonus(-1);
                this.setShield(14, 25);
                break;
            case 'Tower Shield':
                this.updateDodgeBonus(-3)
                this.updateMpBonus(-1);
                this.setShield(16, 40);
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            case 'Cosmic Touched':
                this.updateSpiBonus(1);
                this.addDamageResistance({ type: 'cosmic', value: '5 + [HALF LEVEL]'});
                break;
            case 'Cosmic Blessed':
                this.updateSpiBonus(2);
                this.addDamageResistance({ type: 'cosmic', value: '10 + [LEVEL]'});
                break;
            case 'Cosmic Corrupted':
                this.updateSpiBonus(2);
                this.addDamageResistance({ type: 'cosmic', value: '10 + [LEVEL]'});
                this.addDamageResistance({ type: 'physical', value: '[LEVEL]'});
                break;
            default:
                console.error('Unkown trait ' + traitName + ' unable to apply characteristics');
        }
    }

    private removeTraitsCharacteristics(traitName: string) {
        switch(traitName) {
            case 'Human Versatility':
                this.updateAvailibleNpcPoints(-1);
                break;
            case 'Elven Nimbleness':
                this.updateMpBonus(-1);
                break;
            case 'Dwarven Nightvision':
                break;
            case 'Undead':
                break;
            case 'Fire Elemental':
                break;
            case 'Air Elemental':
                this.removeSpecialMovement('fly(1.5m)');
                break;
            case 'Water Elemental':
                this.removeSpecialMovement('swim(1.5m)');
                break;
            case 'Immortal':
                break;
            case 'Nimble I':
                this.updateMpBonus(-1);
                break;
            case 'Nimble II':
                this.updateMpBonus(-2);
                break;
            case 'Nimble III':
                this.updateMpBonus(-3);
                break;
            case 'Fly I':
                this.removeSpecialMovement('fly(1.5m)');
                break;
            case 'Fly II':
                this.removeSpecialMovement('fly(3m)');
                break;
            case 'Fly III':
                this.removeSpecialMovement('fly(4.5m)');
                break;
            case 'Tank I':
                this.updateBaseHpBonus(-5);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Tank II':
                this.updateBaseHpBonus(-10);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Tank III':
                this.updateBaseHpBonus(-20);
                this.updateHpPerLevelBonus(-2);
                break;
            case 'Stability I':
                this.updateStabilityBonus(-2);
                break;
            case 'Stability II':
                this.updateStabilityBonus(-2);
                break;
            case 'Dodge I':
                this.updateDodgeBonus(-1);
                break;
            case 'Dodge II':
                this.updateDodgeBonus(-1);
                break;
            case 'Toughness I':
                this.updateToughnessBonus(-2);
                break;
            case 'Toughness II':
                this.updateToughnessBonus(-2);
                break;
            case 'Willpower I':
                this.updateWillpowerBonus(-2);
                break;
            case 'Willpower II':
                this.updateWillpowerBonus(-2);
                break;
            case 'Natural Armor':
                this.removeDamageResistance({ type: 'physical', value: '2 + [LEVEL]'});
                break;
            case 'Damage Resistance I':
                this.removeDamageResistance({ type: 'custom', value: '5 + [HALF LEVEL]'});
                break;
            case 'Damage Resistance II':
                this.removeDamageResistance({ type: 'custom', value: '15 + [LEVEL]'});
                break;
            case 'Damage Immunity':
                this.removeDamageImmunity('custom');
                break;
            case 'Status Effect Resistance':
                break;
            case 'Status Effect Immunity':
                this.removeStatusEffectImmunity('custom');
                break;
            case 'Armor I':
                this.updateDodgeBonus(1);
                this.removeDamageResistance({ type: 'physical', value: '2'});
                break;
            case 'Armor II':
                this.updateDodgeBonus(3);
                this.removeDamageResistance({ type: 'physical', value: '4'});
                break;
            case 'Armor III':
                this.updateDodgeBonus(5);
                this.updateMpBonus(1);
                this.removeDamageResistance({ type: 'physical', value: '6'});
                break;
            case 'Small Shield':
                this.setShield(0, 0);
                break;
            case 'Medium Shield':
                this.updateDodgeBonus(1);
                this.setShield(0, 0);
                break;
            case 'Tower Shield':
                this.updateDodgeBonus(3);
                this.updateMpBonus(1);
                this.setShield(0, 0);
                break;
            case 'Nightvision I':
                break;
            case 'Nightvision II':
                break;
            case 'Nightvision III':
                break;
            case 'Cosmic Touched':
                this.updateSpiBonus(-1);
                this.removeDamageResistance({ type: 'cosmic', value: '5 + [HALF LEVEL]'});
                break;
            case 'Cosmic Blessed':
                this.updateSpiBonus(-2);
                this.removeDamageResistance({ type: 'cosmic', value: '10 + [LEVEL]'});
                break;
            case 'Cosmic Corrupted':
                this.updateSpiBonus(-2);
                this.removeDamageResistance({ type: 'cosmic', value: '10 + [LEVEL]'});
                this.removeDamageResistance({ type: 'physical', value: '[LEVEL]'});
                break;
            default:
                console.error('Unkown trait ' + traitName + ' unable to apply characteristics');
        }
    }
}