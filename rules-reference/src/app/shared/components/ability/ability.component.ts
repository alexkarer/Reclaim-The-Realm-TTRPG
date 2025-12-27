import { Component, input } from '@angular/core';
import { Ability, AbilityColour } from '../../../../../../common_resources/shared/Ability';
import { RequirementsPrettierPipe } from '../../utils/to-pretty-string';
import { DynamicContentComponent } from '../../text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../text-utils/text-processor';
import { TextElementsWithoutAbilityComponent } from '../../text-utils/text-elements-without-ability/text-elements-without-ability.component';
import { Technique } from '../../../../../../common_resources/player_rules/techniques/technique';
import { AbilityActionComponent } from "./ability-action/ability-action.component";

@Component({
  selector: 'app-ability',
  imports: [RequirementsPrettierPipe, DynamicContentComponent, TextProcessorPipe, TextElementsWithoutAbilityComponent, AbilityActionComponent],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.scss',
})
export class AbilityComponent {
  ability = input<Ability>();

  get colourClass(): string {
    const colour = this.ability()?.meta.colour ?? AbilityColour.COLOURLESS;
    let colourText = '';
    switch (colour) {
      case AbilityColour.GREEN: colourText = 'ability-green'; break;
      case AbilityColour.RED: colourText = 'ability-red'; break;
      case AbilityColour.BLUE: colourText = 'ability-blue'; break;
      case AbilityColour.YELLOW: colourText = 'ability-yellow'; break;
      case AbilityColour.COLOURLESS: colourText = 'ability-colourless'; break;
    }
    return colourText;
  }

  get abilityCost(): string {
    const cost = this.ability()?.cost;
    if (!cost) {
      console.error('undefined cost for ability', this.ability());
      return 'No Ability Cost Defined';
    }
    let costText = [];
    if ((cost.ap > 0 || (cost.ap === 0, cost.mp === 0))) {
      costText.push(`${cost.ap} [AP]`);
    } if (cost.mp > 0) {
      costText.push(`${cost.mp} [MP]`);
    } if (cost.arcana > 0) {
      costText.push(`${cost.arcana} [ARCANA]`);
    } if (cost.stamina > 0) {
      costText.push(`${cost.stamina} [STAMINA]`);
    } if (cost.other && cost.other.trim() !== '') {
      costText.push(cost.other);
    } if (costText.length === 0) {
      console.error('undefined cost for ability', this.ability());
      return 'No Ability Cost Defined';
    }
    return costText.join(' ');
  }

  isTechnique(): boolean {
    return (this.ability() instanceof Technique)
  }
}
