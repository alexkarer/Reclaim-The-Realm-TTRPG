import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-spells-page',
  imports: [PageNavigationComponent],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss'
})
export class SpellsPageComponent {
  public readonly pageId = 'spells';
}
