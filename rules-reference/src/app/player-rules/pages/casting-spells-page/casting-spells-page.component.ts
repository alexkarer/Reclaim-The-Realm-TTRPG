import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-casting-spells-page',
  imports: [PageNavigationComponent],
  templateUrl: './casting-spells-page.component.html',
  styleUrl: './casting-spells-page.component.scss'
})
export class SpellsPageComponent {
  public readonly pageId = 'casting-spells';
}
