import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-equipment-page',
  imports: [PageNavigationComponent],
  templateUrl: './equipment-page.component.html',
  styleUrl: './equipment-page.component.scss'
})
export class EquipmentPageComponent {
  public readonly pageId = 'equipment';
}
