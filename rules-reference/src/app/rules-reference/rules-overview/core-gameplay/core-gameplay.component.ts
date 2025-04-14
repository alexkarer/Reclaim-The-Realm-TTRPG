import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import coreGameplayJson from '../../../../../../common_resources/rules_overview/core_gameplay.json';

@Component({
    selector: 'app-core-gameplay',
    imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
    templateUrl: './core-gameplay.component.html',
    styleUrl: './core-gameplay.component.scss'
})
export class CoreGameplayComponent {
  public readonly coreGameplayIntroduction: string = coreGameplayJson.core_gameplay_introduction;
  public readonly d20Test: string = coreGameplayJson.d20_test;
  public readonly difficultyThreshold: string = coreGameplayJson.difficulty_threshold
  public readonly advantageDisadvantage: string = coreGameplayJson.advantage_disadvantage;
  public readonly degreesOfSuccessFailure: string = coreGameplayJson.degrees_of_success_failure;
  public readonly structuredUnstructeredTime: string = coreGameplayJson.structured_vs_unstructured_time;
  public readonly difficultyThresholds = coreGameplayJson.difficultyThresholds;
}
