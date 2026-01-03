import { Component, input, forwardRef } from '@angular/core';
import { AbilityAction, AbilityActionType, AbilityRangeType, AbilityTargetType } from '../../../../../../../common_resources/shared/Ability';
import { DynamicContentComponent } from "../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../text-utils/text-processor";
import { AbilityOutcomeComponent } from "./ability-outcome/ability-outcome.component";

@Component({
  selector: 'app-ability-action',
  imports: [forwardRef(() => DynamicContentComponent), TextProcessorPipe, AbilityOutcomeComponent],
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
    if (!at) {
      console.error('unable to determine action type', this.action());
      return 'unspecified';
    }

    switch(at) {
      case AbilityActionType.SIMPLE: return '';
      case AbilityActionType.MARTIAL_TEST: return `[${this.action()?.attribute}] [MARTIAL TEST] vs. [${this.action()?.opposingSave}]`;
      case AbilityActionType.SPELL_TEST: return `[${this.action()?.attribute}] [SPELL TEST] vs. [${this.action()?.opposingSave}]`;
      case AbilityActionType.CUSTOM: return`${this.action()?.customAction}`;
    }
  }

  get hasTargets(): boolean {
    return this.action()?.targetType !== AbilityTargetType.NONE;
  }

  get targetText(): string {
    const targetType = this.action()?.targetType;
    if (!targetType) {
      console.error('unable to determine traget type', this.action());
      return 'unspecified';
    }

    switch(targetType) {
      case AbilityTargetType.SELF: return'[SELF]';
      case AbilityTargetType.CREATURE: return`${this.action()?.targets} ${this.areMultipleTargets() ? 'Creatures' : 'Creature'}`;
      case AbilityTargetType.ALLY: return`${this.action()?.targets} ${this.areMultipleTargets() ? 'Allies' : 'Ally'}`;
      case AbilityTargetType.SPHERE: return`[SPHERE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
      case AbilityTargetType.LINE: return`[LINE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
      case AbilityTargetType.CONE: return`[CONE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
      case AbilityTargetType.SQUARE: return`[SQUARE] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
      case AbilityTargetType.AURA: return`[AURA] ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
      case AbilityTargetType.ALL: 
        let text = '';
        this.action()?.targetAreaSizeFields == 0 ? 
          text = `All creatures` :
          text = `All creatures within ${this.action()?.targetAreaSizeFields}[FIELD] (${(this.action()?.targetAreaSizeFields ?? 0) * 1.5}m)`;
        return text;
      case AbilityTargetType.CUSTOM: return`${this.action()?.customTargeting}`;
    }
  }

  get hasRange(): boolean {
    return this.action()?.rangeType !== AbilityRangeType.NONE;
  }

  get rangeText(): string {
    const rangeType = this.action()?.rangeType;
    if (!rangeType) {
      console.error('unable to determine range type', this.action());
      return 'unspecified';
    }
    
    switch (rangeType) {
      case AbilityRangeType.MELEE: return '[MELEE]';
      case AbilityRangeType.FIELDS: return `${this.action()?.rangeDistanceFields}[FIELD] (${(this.action()?.rangeDistanceFields ?? 0) * 1.5}m);`;
      case AbilityRangeType.RANGE_DROPOFF: return `[RANGE_DROPOFF] ${this.action()?.rangeDistanceFields}[FIELD]/${(this.action()?.rangeDistanceFields ?? 0) * 2}[FIELD]/${(this.action()?.rangeDistanceFields ?? 0) * 4}[FIELD];`;;
    }
  }

  private areMultipleTargets(): boolean {
    return (this.action()?.targets ?? 0) > 1
  }
}
