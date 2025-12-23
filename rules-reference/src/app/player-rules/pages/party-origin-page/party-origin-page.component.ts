import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-party-origin-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './party-origin-page.component.html',
  styleUrl: './party-origin-page.component.scss'
})
export class PartyOriginPageComponent {
  public readonly pageId = 'party-origin';
}
