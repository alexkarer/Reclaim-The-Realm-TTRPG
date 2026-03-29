import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import spellsRulesJson from "../../../../../../common_resources/player_rules/spells/spell_rules.json";

@Component({
  selector: 'app-casting-spells-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './casting-spells-page.component.html',
  styleUrl: './casting-spells-page.component.scss'
})
export class SpellsPageComponent {
  public readonly pageId = 'casting-spells';
  public readonly spellsRulesJson = spellsRulesJson;
}
