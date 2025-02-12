import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";

import spellsRulesJson from '../../../../../ttrpg_resources/spells/spellRules.json';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  public readonly spellRulesJson = spellsRulesJson;
}
