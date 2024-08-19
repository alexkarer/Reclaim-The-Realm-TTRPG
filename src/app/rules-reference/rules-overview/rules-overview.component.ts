import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { NgbScrollSpyItem } from '@ng-bootstrap/ng-bootstrap';
import introductionJson from '../../../../ttrpg_resources/rules_overview/introduction.json';
import keywordsJson from '../../../../ttrpg_resources/rules_overview/keywords.json';
import { CoreGameplayComponent } from "./core-gameplay/core-gameplay.component";

@Component({
  selector: 'app-rules-overview',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyItem, CoreGameplayComponent],
  templateUrl: './rules-overview.component.html',
  styleUrl: './rules-overview.component.scss'
})
export class RulesOverviewComponent {
  public readonly introductionText: string = introductionJson.introduction;
  public readonly keywordsText: string = keywordsJson.keywords;
}
