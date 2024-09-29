import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../ttrpg_resources/equipment/equipment';

@Component({
  selector: 'app-equipment-item',
  standalone: true,
  imports: [],
  templateUrl: './equipment-item.component.html',
  styleUrl: './equipment-item.component.scss'
})
export class EquipmentItemComponent {

  @Input() public equipment?: Equipment;
}
