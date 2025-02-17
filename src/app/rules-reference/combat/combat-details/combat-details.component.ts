import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import combatDetailsJson from '../../../../../ttrpg_resources/combat/combat_details.json'
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-list.component";

@Component({
    selector: 'app-combat-details',
    imports: [NgbScrollSpyFragment, DynamicContentComponent, KeywordProcessorPipe, AbilityListComponent],
    templateUrl: './combat-details.component.html',
    styleUrl: './combat-details.component.scss'
})
export class CombatDetailsComponent {

  public readonly combatDetails = combatDetailsJson;

}
