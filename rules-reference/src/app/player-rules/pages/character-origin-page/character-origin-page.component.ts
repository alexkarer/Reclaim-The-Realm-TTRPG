import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

import originJson from '../../../../../../common_resources/player_rules/character/character_origin.json';

@Component({
  selector: 'app-character-origin-page',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent,
    PlayerRulesPageNavigationComponent
  ],
  templateUrl: './character-origin-page.component.html',
  styleUrl: './character-origin-page.component.scss'
})
export class CharacterOriginPageComponent {
  public readonly pageId = 'character-origin';
  public readonly characterOrigin = originJson;
}
