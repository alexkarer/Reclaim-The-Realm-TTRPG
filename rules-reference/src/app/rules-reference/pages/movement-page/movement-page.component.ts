import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

import specialMovementJson from '../../../../../../common_resources/player_rules/character/special_movement.json';

@Component({
  selector: 'app-movement-page',
  imports: [RulesReferencePageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './movement-page.component.html',
  styleUrl: './movement-page.component.scss'
})
export class MovementPageComponent {
  public readonly pageId = 'movement';
  public readonly specialMovement = specialMovementJson;
}
