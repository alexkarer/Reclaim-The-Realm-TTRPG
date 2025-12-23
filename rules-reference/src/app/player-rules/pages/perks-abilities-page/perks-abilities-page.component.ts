import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-perks-abilities-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './perks-abilities-page.component.html',
  styleUrl: './perks-abilities-page.component.scss'
})
export class PerksAbilitiesPageComponent {
  public readonly pageId = 'perks-abilities';
}
