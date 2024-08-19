import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../../shared/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-transformer/text-transformer";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import coreGameplayJson from '../../../../../ttrpg_resources/rules_overview/core_gameplay.json';

@Component({
  selector: 'app-core-gameplay',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
  templateUrl: './core-gameplay.component.html',
  styleUrl: './core-gameplay.component.scss'
})
export class CoreGameplayComponent {
  public readonly coreGameplayIntroduction: string = coreGameplayJson.core_gameplay_introduction;
  public readonly d20Test: string = coreGameplayJson.d20_test;
  public readonly difficulty_threshold: string = coreGameplayJson.difficulty_threshold
  public readonly advantageDisadvantage: string = coreGameplayJson.advantage_disadvantage;
  public readonly degreesOfSuccessFailure: string = coreGameplayJson.degrees_of_success_failure;
  public readonly structured_unstructured_time: string = coreGameplayJson.structured_vs_unstructured_time;
}
