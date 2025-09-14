import { Component, input } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import { ResolveTextKeyPipe } from '../../shared/text-utils/resolve-text-key';

import speciesJson from '../../../../../common_resources/player_rules/character/species.json';

@Component({
  selector: 'app-species',
  imports: [TextProcessorPipe, ResolveTextKeyPipe, DynamicContentComponent],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss'
})
export class SpeciesComponent {

  public species = input<typeof speciesJson[0]>(speciesJson[0]);

}
