import { Component } from '@angular/core';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { armours } from '../../../../../../common_resources/equipment/armour/armour';

import armourRulesJson from '../../../../../../common_resources/equipment/armour/armourRules.json'

@Component({
    selector: 'app-armour',
    imports: [DynamicContentComponent, TextProcessorPipe],
    templateUrl: './armour.component.html',
    styleUrl: './armour.component.scss'
})
export class ArmourComponent {
  public readonly armourRules = armourRulesJson;
  public readonly armours = armours;
}
