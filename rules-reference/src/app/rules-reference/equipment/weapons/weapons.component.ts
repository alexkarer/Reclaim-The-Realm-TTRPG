import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { weapons, ammunitions } from '../../../../../../common_resources/equipment/weapons/weapons';

import weaponRulesJson from '../../../../../../common_resources/equipment/weapons/weaponRules.json'
import ammunitionRulesJson from '../../../../../../common_resources/equipment/weapons/ammunitionsRules.json'
import { TextElementsComponent } from "../../../shared/text-utils/text-elements/text-elements.component";

@Component({
    selector: 'app-weapons',
    imports: [DynamicContentComponent, KeywordProcessorPipe, TextElementsComponent],
    templateUrl: './weapons.component.html',
    styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  public readonly weaponRulesJson = weaponRulesJson;
  public readonly weapons = weapons;

  public readonly ammunitionRulesJson = ammunitionRulesJson;
  public readonly ammunitions = ammunitions;
}
