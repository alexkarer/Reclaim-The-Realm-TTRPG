import { Component, output } from '@angular/core';
import { Ability } from '../../npc/npc';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import customAbilitiesJson from '../../../resources/custom_abilities.json';

@Component({
  selector: 'app-custom-ability',
  imports: [NgbDropdownModule],
  templateUrl: './custom-ability.component.html',
  styleUrl: './custom-ability.component.scss'
})
export class CustomAbilityComponent {
  abilityChange = output<Ability>();
  customAbilityOptions = customAbilitiesJson;

  abilityType: string = customAbilitiesJson.abilityTypes[0];
  name: string = 'Custom Ability';
  usageCost = customAbilitiesJson.abilityUsageCosts[1];
  usageRestriction = customAbilitiesJson.abilityUsageRestriction[0];
  targetType = customAbilitiesJson.abilityTargetTypes[0];
  targets = customAbilitiesJson.targets[0];
  targetSave = customAbilitiesJson.targetSave[0];
  dtCalculationAttribute = customAbilitiesJson.dtCalculationAttribute[0];
  onFailureEffect = customAbilitiesJson.onFailureEffect[0];
  mainEffect = customAbilitiesJson.mainEffects[1];
  additionalEffects: (typeof customAbilitiesJson.additionalEffects[0])[] = [];

  calculatePointsCost(): number {
    return this.usageCost.pointCost +
      this.usageRestriction.pointCost +
      this.targets.pointCost +
      this.mainEffect.pointCost +
      this.additionalEffects.map(e => e.pointCost).reduce(((e1, e2) => e1 + e2), 0)
  }

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.name = target.value;
    this.triggerUpdate();
  }

  handleTypeUpdate(type: string): void {
    this.abilityType = type;
    this.triggerUpdate();
  }

  handleUsageCostUpdate(cost: typeof customAbilitiesJson.abilityUsageCosts[1]): void {
    this.usageCost = cost;
    this.triggerUpdate();
  }

  handleUsageRestrictionUpdate(restriction: typeof customAbilitiesJson.abilityUsageRestriction[0]): void {
    this.usageRestriction = restriction;
    this.triggerUpdate();
  }

  handleTargetTypesUpdate(targetType: string): void {
    this.targetType = targetType;
    this.triggerUpdate();
  }

  handleTargetsUpdate(target: typeof customAbilitiesJson.targets[0]): void {
    this.targets = target;
    this.triggerUpdate();
  }

  handleTargetSaveUpdate(targetSave: string): void {
    this.targetSave = targetSave;
    this.triggerUpdate();
  }

  handleDtCalculationAttributeUpdate(attr: string): void {
    this.dtCalculationAttribute = attr;
    this.triggerUpdate();
  }

  handleOnFailureEffectUpdate(effect: string): void {
    this.onFailureEffect = effect;
    this.triggerUpdate();
  }

  handleMainEffectUpdate(effect: typeof customAbilitiesJson.mainEffects[0]): void {
    this.mainEffect = effect;
    this.triggerUpdate();
  }

  handleAdditionalEffectCheckBoxUpdate(event: Event, effect: typeof customAbilitiesJson.additionalEffects[0]): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.additionalEffects.push(effect);
    } else {
      this.additionalEffects = this.additionalEffects.filter(e => e.additionalEffect !== effect.additionalEffect);
    }
    this.triggerUpdate();
  }

  private triggerUpdate(): void {
    this.abilityChange.emit({
      name: this.getAbilityName(),
      pointsCost: this.calculatePointsCost(),
      apCost: this.usageCost.apCost,
      mpCost: 0,
      description: this.getDescription()
    });
  }

  private getAbilityName(): string {
    if (this.usageRestriction.abilityUsageRestriction === 'None') {
      return this.name;
    } else {
      return this.name + ', ' + this.usageRestriction.abilityUsageRestriction;
    }
  }

  private getDescription(): string {
    let rawDescription = 
      this.targetType + ' ' + 
      (this.targetType.includes('CUSTOM DT') ? ' [SELECTED SAVE]' : '') +
      this.targets.target +  '. ' +
      (this.targetType.includes('ATTACK') ? 'On hit: ' : 'On success: ') +
      this.mainEffect.mainEffect + '. ' +
      (this.additionalEffects.length === 0 ? '' : ', additionally ') +
      this.additionalEffects.map(e => e.additionalEffect).join(' and ') + 
      (this.onFailureEffect !== 'nothing' ? ('. On Failure: ' + this.onFailureEffect) : '');

    if (this.abilityType === 'Martial') {
      return rawDescription.replaceAll('[MELEE ATTACK]', '[MELEE MARTIAL ATTACK]')
        .replaceAll('[RANGED ATTACK]', '[RANGED MARTIAL ATTACK]')
        .replaceAll('[LIGHT DAMAGE]', '[LIGHT MARTIAL DAMAGE]')
        .replaceAll('[MEDIUM DAMAGE]', '[MEDIUM MARTIAL DAMAGE]')
        .replaceAll('[HEAVY DAMAGE]', '[HEAVY MARTIAL DAMAGE]')
        .replaceAll('[LEVEL]', '[MARTIAL LEVEL]')
        .replaceAll('[SELECTED SAVE]', this.targetSave + ' [SAVE]')
        .replaceAll('[CUSTOM DT]', '[DT] 10+[MARTIAL LEVEL]+' + this.dtCalculationAttribute)
    } else {
      return rawDescription.replaceAll('[MELEE ATTACK]', '[MELEE SPELL ATTACK]')
        .replaceAll('[RANGED ATTACK]', '[RANGED SPELL ATTACK]')
        .replaceAll('[LIGHT DAMAGE]', '[LIGHT SPELL DAMAGE]')
        .replaceAll('[MEDIUM DAMAGE]', '[MEDIUM SPELL DAMAGE]')
        .replaceAll('[HEAVY DAMAGE]', '[HEAVY SPELL DAMAGE]')
        .replaceAll('[LEVEL]', '[SPELL LEVEL]')
        .replaceAll('[SELECTED SAVE]', this.targetSave + ' [SAVE]')
        .replaceAll('[CUSTOM DT]', '[DT] 8+[SPELL LEVEL]+' + this.dtCalculationAttribute)
    }
  }
}
