import { Component } from '@angular/core';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import progressionJson from '../../../../../../common_resources/character_values/progression.json';

@Component({
    selector: 'app-progression',
    imports: [TextProcessorPipe, DynamicContentComponent],
    templateUrl: './progression.component.html',
    styleUrl: './progression.component.scss'
})
export class ProgressionComponent {
  public readonly progressionDescription = progressionJson.progressionDescription;
  public readonly perksDescription = progressionJson.perksDescription;
  public readonly levelRequirements = progressionJson.levelRequirementsAndBonuses;
}
