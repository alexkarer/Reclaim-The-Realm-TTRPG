import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

import spellsRulesJson from '../../../../../../common_resources/spells/spellRules.json';

@Component({
    selector: 'app-spells',
    imports: [DynamicContentComponent, TextProcessorPipe],
    templateUrl: './spells.component.html',
    styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  public readonly spellRulesJson = spellsRulesJson;
}
