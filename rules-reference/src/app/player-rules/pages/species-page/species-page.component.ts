import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import speciesJson from '../../../../../../common_resources/player_rules/character/species.json';

@Component({
  selector: 'app-species-page',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent,
    PlayerRulesPageNavigationComponent
  ],
  templateUrl: './species-page.component.html',
  styleUrl: './species-page.component.scss'
})
export class SpeciesPageComponent {
  public readonly speciesList = speciesJson;
  public readonly pageId = 'species';
}
