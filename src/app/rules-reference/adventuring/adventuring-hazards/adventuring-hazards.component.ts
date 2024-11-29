import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import adventuringHazardsJson from '../../../../../ttrpg_resources/adventuring/adventuring_hazards.json'

@Component({
  selector: 'app-adventuring-hazards',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './adventuring-hazards.component.html',
  styleUrl: './adventuring-hazards.component.scss'
})
export class AdventuringHazardsComponent {

  public readonly description = adventuringHazardsJson.description;
  public readonly fallingAndCrashing = adventuringHazardsJson.fallingAndCrashingIntoObjects;
  public readonly traps = adventuringHazardsJson.traps;
  public readonly downingAndSuffocating = adventuringHazardsJson.suffocatingAndDrowning;
  public readonly environmentalConditions = adventuringHazardsJson.environmentalConditions;
  public readonly poisonsAndDiseases = adventuringHazardsJson.poisonsAndDiseases;
}
