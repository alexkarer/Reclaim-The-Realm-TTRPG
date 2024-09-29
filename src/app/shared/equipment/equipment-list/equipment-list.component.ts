import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../../ttrpg_resources/equipment/equipment';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent {
  @Input() public equipmentList?: Equipment[];
}
