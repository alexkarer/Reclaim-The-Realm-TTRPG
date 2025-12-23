import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-travel-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './travel-page.component.html',
  styleUrl: './travel-page.component.scss'
})
export class TravelPageComponent {
  public readonly pageId = 'travel';
}
