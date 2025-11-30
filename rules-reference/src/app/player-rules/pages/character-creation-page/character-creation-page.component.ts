import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import characterCreationStepsJson from '../../../../../../common_resources/player_rules/character_creation_steps.json';

@Component({
  selector: 'app-character-creation-page',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent,
    PageNavigationComponent
  ],
  templateUrl: './character-creation-page.component.html',
  styleUrl: './character-creation-page.component.scss'
})
export class CharacterCreationPageComponent {
  public readonly characterCreationSteps = characterCreationStepsJson;
  public readonly pageId = 'character-creation';
}
