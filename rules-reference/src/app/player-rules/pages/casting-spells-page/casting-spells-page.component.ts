import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-casting-spells-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './casting-spells-page.component.html',
  styleUrl: './casting-spells-page.component.scss'
})
export class SpellsPageComponent {
  public readonly pageId = 'casting-spells';
}
