import { Component } from '@angular/core';
import { KeywordProcessorPipe } from '../../../shared/text-transformer/text-transformer';
import { DynamicContentComponent } from '../../../shared/dynamic-component-rendering/dynamic-content.component';
import progressionJson from '../../../../../ttrpg_resources/character_values/progression.json';

@Component({
  selector: 'app-progression',
  standalone: true,
  imports: [KeywordProcessorPipe, DynamicContentComponent],
  templateUrl: './progression.component.html',
  styleUrl: './progression.component.scss'
})
export class ProgressionComponent {
  public readonly progressionDescription = progressionJson.progressionDescription;
  public readonly levelRequirements = progressionJson.levelRequirementsAndBonuses;
}
