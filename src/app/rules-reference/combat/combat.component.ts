import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../shared/text-utils/keyword-processor';
import { CombatOverviewComponent } from "./combat-overview/combat-overview.component";
import { CombatDetailsComponent } from "./combat-details/combat-details.component";
import { StatusEffectsOverviewComponent } from "./status-effects-overview/status-effects-overview.component";
import combatOverviewJson from '../../../../ttrpg_resources/combat/combat_overview.json'

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [NgbScrollSpyFragment, DynamicContentComponent, KeywordProcessorPipe, CombatOverviewComponent, CombatDetailsComponent, StatusEffectsOverviewComponent],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.scss'
})
export class CombatComponent {

  public readonly generalCombatDescription = combatOverviewJson.generalCombatDescription;

}
