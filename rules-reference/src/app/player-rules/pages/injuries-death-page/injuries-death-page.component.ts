import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'injuries-death-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './injuries-death-page.component.html',
  styleUrl: './injuries-death-page.component.scss'
})
export class InjuriesDeathPageComponent {
  public readonly pageId = 'injuries-death';
}
