import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import injuryDeathJson from "../../../../../../common_resources/player_rules/exhaustion_death_resting/injury_death.json";

@Component({
  selector: 'injuries-death-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './injuries-death-page.component.html',
  styleUrl: './injuries-death-page.component.scss'
})
export class InjuriesDeathPageComponent {
  public readonly pageId = 'injuries-death';
  public readonly injuryDeath = injuryDeathJson;
}
