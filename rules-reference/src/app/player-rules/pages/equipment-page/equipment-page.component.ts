import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-equipment-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './equipment-page.component.html',
  styleUrl: './equipment-page.component.scss'
})
export class EquipmentPageComponent {
  public readonly pageId = 'equipment';
}
