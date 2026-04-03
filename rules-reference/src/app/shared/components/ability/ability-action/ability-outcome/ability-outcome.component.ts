import { Component, input, forwardRef } from '@angular/core';
import { AbilityActionOutcome, AbilityActionOutcomeType, DurationUnit } from '../../../../../../../../common_resources/shared/Ability';
import { DynamicContentComponent } from "../../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../../text-utils/text-processor";
import { TextElementWithoutAbility } from '../../../../../../../../common_resources/shared/TextElements';
import { TextElementsWithoutAbilityComponent } from "../../../../text-utils/text-elements-without-ability/text-elements-without-ability.component";

@Component({
  selector: 'app-ability-outcome',
  imports: [forwardRef(() => DynamicContentComponent), TextProcessorPipe, forwardRef(() => TextElementsWithoutAbilityComponent)],
  templateUrl: './ability-outcome.component.html',
  styleUrl: './ability-outcome.component.scss',
})
export class AbilityOutcomeComponent {
  outcome = input<AbilityActionOutcome>();

  AbilityActionOutcomeType = AbilityActionOutcomeType;

  get type(): AbilityActionOutcomeType {
    return this.outcome()?.outcomeType ?? AbilityActionOutcomeType.FREETEXT;
  }

  get freeText(): TextElementWithoutAbility[] {
    return this.outcome()?.freeText ?? [];
  }

  get damageText(): string {
    return `Deal ${this.outcome()?.expression} ${this.outcome()?.damageType} Damage${this.outcome()?.halfDamage ? ' [HALF]' : ''}${this.outcome()?.critDamage ? ' [CRIT]' : ''}`;
  }

  get healText(): string {
    if (this.outcome()?.healThp) {
      return `Gain ${this.outcome()?.expression} [THP]${this.getDurationText()}`;
    } else {
      return `Heal ${this.outcome()?.expression} [HP]`;
    }
  }

  get statusEffectText(): string {
    return `Apply [${this.outcome()?.statusEffect}]${this.getDurationText()}`;
  }

  private getDurationText(): string {
    if (this.outcome()?.durationUnit === DurationUnit.INDEFINATE) {
      return '';
    } else {
      return ` for ${this.outcome()?.duration} ${this.parseDurationUnit(this.outcome()?.durationUnit, this.outcome()?.duration)}`;
    }
  }

  private parseDurationUnit(unit?: DurationUnit, durationAmount?: number): string {
    switch(unit) {
      case DurationUnit.ROUND: return ((durationAmount ?? 0) > 1 ? '[ROUNDS]' : '[ROUND]');
      case DurationUnit.HOUR: return ((durationAmount ?? 0) > 1 ? 'Hours' : 'Hour');
      case DurationUnit.MINUTE: return ((durationAmount ?? 0) > 1 ? 'Minutes' : 'Minutes');
      case DurationUnit.INDEFINATE: return '';
      case DurationUnit.NONE: return '';
    }
    return '';
  }
}