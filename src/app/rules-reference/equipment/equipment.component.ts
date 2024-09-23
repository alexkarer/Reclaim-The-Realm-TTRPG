import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/dynamic-component-rendering/dynamic-content.component';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { KeywordProcessorPipe } from '../../shared/text-transformer/text-transformer';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmourComponent } from './armour/armour.component';
import { ShieldsComponent } from './shields/shields.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { CraftingComponent } from './crafting/crafting.component';
import { MagicItemsComponent } from './magic-items/magic-items.component';
import equipmentJson from '../../../../ttrpg_resources/equipment/equipment.json';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [DynamicContentComponent, NgbScrollSpyFragment, KeywordProcessorPipe, WeaponsComponent, ArmourComponent, ShieldsComponent, OtherItemsComponent, CraftingComponent, MagicItemsComponent],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {
  public readonly equipmentJson = equipmentJson;
}
