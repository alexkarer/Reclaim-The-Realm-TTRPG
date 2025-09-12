import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import combatOverviewJson from '../../../../../../common_resources/combat/combat_overview.json'

@Component({
    selector: 'app-combat-overview',
    imports: [NgbScrollSpyFragment, DynamicContentComponent, TextProcessorPipe],
    templateUrl: './combat-overview.component.html',
    styleUrl: './combat-overview.component.scss'
})
export class CombatOverviewComponent {
  public readonly combatOverviewJson = combatOverviewJson;
}
