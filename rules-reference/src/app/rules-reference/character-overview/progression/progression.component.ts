import { Component } from '@angular/core';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import progressionJson from '../../../../../../common_resources/character_values/progression.json';

@Component({
    selector: 'app-progression',
    imports: [KeywordProcessorPipe, DynamicContentComponent],
    templateUrl: './progression.component.html',
    styleUrl: './progression.component.scss'
})
export class ProgressionComponent {
  public readonly progressionDescription = progressionJson.progressionDescription;
  public readonly perksDescription = progressionJson.perksDescription;
  public readonly levelRequirements = progressionJson.levelRequirementsAndBonuses;
}
