import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-party-origin-page',
  imports: [PageNavigationComponent],
  templateUrl: './party-origin-page.component.html',
  styleUrl: './party-origin-page.component.scss'
})
export class PartyOriginPageComponent {
  public readonly pageId = 'party-origin';
}
