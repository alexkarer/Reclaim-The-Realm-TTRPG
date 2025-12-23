import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";

import progressionJson from '../../../../../../common_resources/player_rules/character/progression.json';

@Component({
  selector: 'app-getting-stronger-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, TextProcessorPipe, ResolveTextKeyPipe],
  templateUrl: './getting-stronger-page.component.html',
  styleUrl: './getting-stronger-page.component.scss'
})
export class GettingStrongerPageComponent {
  public readonly pageId = 'getting-stronger';
  public readonly progression = progressionJson;
}
