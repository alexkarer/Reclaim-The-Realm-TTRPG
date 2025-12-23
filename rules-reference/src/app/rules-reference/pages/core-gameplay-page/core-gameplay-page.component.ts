import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

import difficultyThresholdJson from "../../../../../../common_resources/core_rules/difficulty_thresholds.json";

@Component({
  selector: 'app-core-gameplay-page',
  imports: [RulesReferencePageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './core-gameplay-page.component.html',
  styleUrl: './core-gameplay-page.component.scss'
})
export class CoreGamePlayPageComponent {
  public readonly pageId = 'core-gameplay';
  public readonly difficultyThreshold = difficultyThresholdJson;
}
