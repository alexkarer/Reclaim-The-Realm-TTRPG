import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-old-list.component";
import combatDetailsJson from '../../../../../../common_resources/combat/combat_details.json'

@Component({
    selector: 'app-combat-details',
    imports: [NgbScrollSpyFragment, DynamicContentComponent, TextProcessorPipe, AbilityListComponent],
    templateUrl: './combat-details.component.html',
    styleUrl: './combat-details.component.scss'
})
export class CombatDetailsComponent {

  public readonly combatDetails = combatDetailsJson;

}
