import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-transformer/text-transformer';
import { simpleWeapons } from '../../../../../ttrpg_resources/equipment/weapons/weapons';
import weaponRulesJson from '../../../../../ttrpg_resources/equipment/weapons/weaponRules.json'

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  public readonly weaponRulesJson = weaponRulesJson;
  public readonly simpleWeapons = simpleWeapons;
}
