import { Component } from '@angular/core';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { armours } from '../../../../../ttrpg_resources/equipment/armour/armour';

import armourRulesJson from '../../../../../ttrpg_resources/equipment/armour/armourRules.json'

@Component({
    selector: 'app-armour',
    imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
    templateUrl: './armour.component.html',
    styleUrl: './armour.component.scss'
})
export class ArmourComponent {
  public readonly armourRules = armourRulesJson;
  public readonly armours = armours;
}
