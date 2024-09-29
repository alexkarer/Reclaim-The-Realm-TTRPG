import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { WeaponPropertyProcessor } from "../../../shared/text-utils/weapon-property-processor";
import { simpleWeapons, advancedWeapons } from '../../../../../ttrpg_resources/equipment/weapons/weapons';

import weaponRulesJson from '../../../../../ttrpg_resources/equipment/weapons/weaponRules.json'

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment, WeaponPropertyProcessor],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  public readonly weaponRulesJson = weaponRulesJson;
  public readonly simpleWeapons = simpleWeapons;
  public readonly advancedWeapons = advancedWeapons;
}
