import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../shared/text-utils/text-processor";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { ResolveTextKeyPipe } from "../../shared/text-utils/resolve-text-key";

import difficultyThresholdJson from "../../../../../common_resources/core_rules/difficulty_thresholds.json";

@Component({
  selector: 'app-rules-overview',
  imports: [DynamicContentComponent, TextProcessorPipe, NgbScrollSpyFragment, ResolveTextKeyPipe],
  templateUrl: './rules-overview.component.html',
  styleUrl: './rules-overview.component.scss'
})
export class RulesOverviewComponent {

  public readonly difficultyThreshold = difficultyThresholdJson;
}
