import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

import abilitiesJson from "../../../../../../common_resources/player_rules/character/abilities.json";
import techniqueRulesJson from "../../../../../../common_resources/player_rules/techniques/technique_rules.json";

@Component({
  selector: 'app-perks-abilities-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './perks-abilities-page.component.html',
  styleUrl: './perks-abilities-page.component.scss'
})
export class PerksAbilitiesPageComponent {
  public readonly pageId = 'perks-abilities';
  public readonly abilitiesJson = abilitiesJson;
  public readonly techniqueRulesJson = techniqueRulesJson;
}
