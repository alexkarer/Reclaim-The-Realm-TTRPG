import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { KeywordProcessorPipe } from '../../shared/text-utils/keyword-processor';
import { WeaponsComponent } from './weapons/weapons.component';
import { ArmourComponent } from './armour/armour.component';
import { OtherItemsComponent } from './other-items/other-items.component';
import { CraftingComponent } from './crafting/crafting.component';
import { MagicItemsComponent } from './magic-items/magic-items.component';
import equipmentJson from '../../../../ttrpg_resources/equipment/equipment.json';
import { halveArray } from '../../shared/utils/array-utils';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [DynamicContentComponent, NgbScrollSpyFragment, KeywordProcessorPipe, WeaponsComponent, ArmourComponent, OtherItemsComponent, CraftingComponent, MagicItemsComponent],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {
  public readonly equipmentJson = equipmentJson;

  public readonly carryingCapacityTable1 = halveArray(equipmentJson.carryingCapacityTable)[0];
  public readonly carryingCapacityTable2 = halveArray(equipmentJson.carryingCapacityTable)[1];

  public formatWeight(weightKg: number): string {
    if (weightKg < 1000) {
      return weightKg + ' kg';
    } else {
      return (weightKg / 1000) + ' t';
    }
  }
}
