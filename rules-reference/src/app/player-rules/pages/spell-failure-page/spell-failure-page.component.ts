import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import spellsRulesJson from "../../../../../../common_resources/player_rules/spells/spell_rules.json";

@Component({
  selector: 'app-spell-failure-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './spell-failure-page.component.html',
  styleUrl: './spell-failure-page.component.scss'
})
export class SpellFailurePageComponent {
  public readonly pageId = 'spell-failure';
  public readonly spellsRulesJson = spellsRulesJson;
}
