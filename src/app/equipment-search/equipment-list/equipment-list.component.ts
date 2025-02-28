import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../ttrpg_resources/equipment/equipment';
import { TextElementsComponent } from "../../shared/text-utils/text-elements/text-elements.component";
import { Armour } from '../../../../ttrpg_resources/equipment/armour/armour';

@Component({
  selector: 'app-equipment-list',
  imports: [TextElementsComponent],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent {
  @Input() equipmentList: Equipment[] = [];
  public equipmentDescriptionEnabled: boolean[] = [];

  public isArmour(item: Equipment): boolean {
    return (item instanceof Armour);
  }

  public getArmourDamageBlock(item: Equipment): string {
    if (item instanceof Armour) {
      return item.damageBlock?.amount + ' ' + item.damageBlock?.type
    }
    console.error('Item is not an armour: ' + item.name);
    return '';
  }

  public getArmourManoeuvrePeanlty(item: Equipment): string {
    if (item instanceof Armour) {
      return item.manoeuvrePenalty === 0 ? '-' : item.manoeuvrePenalty.toString();
    }
    console.error('Item is not an armour: ' + item.name);
    return '';
  }

  public getArmourMovementPenalty(item: Equipment): string {
    if (item instanceof Armour) {
      return item.movementPenalty === 0 ? '-' : item.movementPenalty.toString();
    }
    console.error('Item is not an armour: ' + item.name);
    return '';
  }
}
