import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { simpleWeapons } from '../../../../../ttrpg_resources/equipment/weapons/weapons';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import weaponRulesJson from '../../../../../ttrpg_resources/equipment/weapons/weaponRules.json'
import { WeaponPropertyProcessor } from "../../../shared/text-utils/weapon-property-processor";

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
}
