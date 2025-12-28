import { Component, input } from '@angular/core';
import { AbilityActionOutcome, AbilityActionOutcomeType, StatusEffectDurationUnit } from '../../../../../../../../common_resources/shared/Ability';
import { DynamicContentComponent } from "../../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../../text-utils/text-processor";
import { TextElementWithoutAbility } from '../../../../../../../../common_resources/shared/TextElements';
import { TextElementsWithoutAbilityComponent } from "../../../../text-utils/text-elements-without-ability/text-elements-without-ability.component";

@Component({
  selector: 'app-ability-outcome',
  imports: [DynamicContentComponent, TextProcessorPipe, TextElementsWithoutAbilityComponent],
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
    return `Deal ${this.outcome()?.damageExpression} ${this.outcome()?.damageType} Damage${this.outcome()?.halfDamage ? ' [HALF]' : ''}${this.outcome()?.critDamage ? ' [CRIT]' : ''}`;
  }

  get healText(): string {
    return `Heal ${this.outcome()?.healExpression}${this.outcome()?.healThp ? ' [THP]' : '[HP]'}`;
  }

  get statusEffectText(): string {
    if (this.outcome()?.statusEffectDurationUnit === StatusEffectDurationUnit.INDEFINATE) {
      return `Apply [${this.outcome()?.statusEffect}]`;
    } else {
      return `Apply [${this.outcome()?.statusEffect}] for ${this.outcome()?.statusEffectDuration} [${this.outcome()?.statusEffectDurationUnit}]`;
    }
  }
}