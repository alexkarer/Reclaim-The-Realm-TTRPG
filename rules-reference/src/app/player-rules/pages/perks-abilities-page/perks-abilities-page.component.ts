import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-perks-abilities-page',
  imports: [PageNavigationComponent],
  templateUrl: './perks-abilities-page.component.html',
  styleUrl: './perks-abilities-page.component.scss'
})
export class PerksAbilitiesPageComponent {
  public readonly pageId = 'perks-abilities';
}
