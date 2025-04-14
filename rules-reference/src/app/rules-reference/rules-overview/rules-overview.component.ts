import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import introductionJson from '../../../../../common_resources/rules_overview/introduction.json';
import keywordsJson from '../../../../../common_resources/rules_overview/keywords.json';
import { CoreGameplayComponent } from "./core-gameplay/core-gameplay.component";

@Component({
    selector: 'app-rules-overview',
    imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment, CoreGameplayComponent],
    templateUrl: './rules-overview.component.html',
    styleUrl: './rules-overview.component.scss'
})
export class RulesOverviewComponent {
  public readonly introductionText: string = introductionJson.introduction;
  public readonly keywordsText: string = keywordsJson.keywords;
}
