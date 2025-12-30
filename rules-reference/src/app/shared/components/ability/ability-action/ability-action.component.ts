import { Component, input } from '@angular/core';
import { AbilityAction, AbilityActionType, AbilityRangeType, AbilityTargetType } from '../../../../../../../common_resources/shared/Ability';
import { DynamicContentComponent } from "../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../text-utils/text-processor";
import { AbilityOutcomeComponent } from "./ability-outcome/ability-outcome.component";

@Component({
  selector: 'app-ability-action',
  imports: [DynamicContentComponent, TextProcessorPipe, AbilityOutcomeComponent],
  templateUrl: './ability-action.component.html',
  styleUrl: './ability-action.component.scss',
})
export class AbilityActionComponent {
  action = input<AbilityAction>();

  get hasCondition(): boolean {
    return this.action()?.customCondition !== null;
  }

  get condition(): string {
    return this.action()?.customCondition ?? 'unspecified';
  }

  get hasAction(): boolean {
    return this.action()?.type !== AbilityActionType.NO_ACTION;
  }

  get noSimpleAction(): boolean {
    return this.action()?.type !== AbilityActionType.SIMPLE;
  }

  get actionText(): string {
    const at = this.action()?.type;
    let text: string | undefined;
    if (!at) {
      console.error('unable to determine action type', this.action());
      return 'unspecified';
    }

    switch(at) {
      case AbilityActionType.MARTIAL_TEST: text = `[${this.action()?.attribute}] [MARTIAL TEST] vs. [${this.action()?.opposingSave}]`; break;
      case AbilityActionType.SPELL_TEST: text = `[${this.action()?.attribute}] [SPELL TEST] vs. [${this.action()?.opposingSave}]`; break;
      case AbilityActionType.D20_TEST: text = `[${this.action()?.attribute}] [D20 TEST] vs. [${this.action()?.opposingSave}]`; break;
    }

    if (!text) {
      console.error('unable to determine action text', this.action());
      return 'unspecified';
    }
    return text;
  }

  get hasTargets(): boolean {
    return this.action()?.targetType !== AbilityTargetType.NONE;
  }

  get targetText(): string {
    const targetType = this.action()?.targetType;
    let text: string | undefined;
    if (!targetType) {
      console.error('unable to determine traget type', this.action());
      return 'unspecified';
    }

    switch(targetType) {
      case AbilityTargetType.SELF: text = '[SELF]'; break;
      case AbilityTargetType.INDIVIDUAL: text = `${this.action()?.targets}`; break;
      case AbilityTargetType.SPHERE: text = `[SPHERE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`; break;
      case AbilityTargetType.LINE: text = `[LINE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`; break;
      case AbilityTargetType.CONE: text = `[CONE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`; break;
      case AbilityTargetType.SQUARE: text = `[SQUARE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`; break;
      case AbilityTargetType.AURA: text = `[AURA] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`; break;
      case AbilityTargetType.ALL: 
        this.action()?.targetAreaSizeFields == 0 ? 
          text = `All creatures` :
          text = `All creatures within ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
        break;
      case AbilityTargetType.CUSTOM: text = `${this.action()?.customTargeting}`; break;
    }

    if (!text) {
      console.error('unable to determine target text', this.action());
      return 'unspecified';
    }
    return text;
  }

  get hasRange(): boolean {
    return this.action()?.rangeType !== AbilityRangeType.NONE;
  }

  get rangeText(): string {
    const rangeType = this.action()?.rangeType;
    let text = '';
    if (!rangeType) {
      console.error('unable to determine range type', this.action());
      return 'unspecified';
    }
    
    switch (rangeType) {
      case AbilityRangeType.MELEE: text = '[MELEE]'; break;
      case AbilityRangeType.FIELDS: text = `${this.action()?.rangeDistanceFields}[FIELD] (${(this.action()?.rangeDistanceFields ?? 0) * 1.5}m);`; break;
    }

    if (text === '') {
      console.error('unable to determine range text', this.action());
      return 'unspecified';
    }
    return text;
  }
}
