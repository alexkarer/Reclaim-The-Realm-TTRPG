import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";
import combatOverviewJson from '../../../../../ttrpg_resources/combat/combat_overview.json'

@Component({
  selector: 'app-combat-overview',
  standalone: true,
  imports: [NgbScrollSpyFragment, DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './combat-overview.component.html',
  styleUrl: './combat-overview.component.scss'
})
export class CombatOverviewComponent {
  public readonly combatOverviewJson = combatOverviewJson;
}
