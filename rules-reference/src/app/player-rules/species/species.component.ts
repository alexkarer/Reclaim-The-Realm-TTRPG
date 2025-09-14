import { Component, input } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';

import speciesJson from '../../../../../common_resources/character/species.json';

@Component({
  selector: 'app-species',
  imports: [TextProcessorPipe, DynamicContentComponent],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss'
})
export class SpeciesComponent {

  public species = input<typeof speciesJson[0]>(speciesJson[0]);

}
