import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

import specialMovementJson from '../../../../../../common_resources/player_rules/character/special_movement.json';
import { STANDARD_ABILITIES } from '../../../../../../common_resources/core_rules/combat/standard_abilities';
import { AbilityComponent } from "../../../shared/components/ability/ability.component";

@Component({
  selector: 'app-movement-page',
  imports: [RulesReferencePageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe, AbilityComponent],
  templateUrl: './movement-page.component.html',
  styleUrl: './movement-page.component.scss'
})
export class MovementPageComponent {
  public readonly pageId = 'movement';
  public readonly specialMovement = specialMovementJson;
  readonly movementAbilities = STANDARD_ABILITIES.filter(a => a.tags.includes('Move'));
}
