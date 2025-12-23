import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-riftlands-travel-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './riftlands-travel-page.component.html',
  styleUrl: './riftlands-travel-page.component.scss'
})
export class RiftlandsTravelPageComponent {
  public readonly pageId = 'riftlands-travel';
}
