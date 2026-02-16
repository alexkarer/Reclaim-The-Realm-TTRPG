import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import exhaustionRestingJson from "../../../../../../common_resources/player_rules/exhaustion_death_resting/exhaustion_resting.json";

@Component({
  selector: 'app-exhaustion-resting-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './exhaustion-resting-page.component.html',
  styleUrl: './exhaustion-resting-page.component.scss'
})
export class ExhaustionRestingPageComponent {
  public readonly pageId = 'exhaustion-resting';
  public readonly exhaustionResting = exhaustionRestingJson;
}
