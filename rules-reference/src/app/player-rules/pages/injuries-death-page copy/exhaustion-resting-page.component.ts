import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-exhaustion-resting-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './exhaustion-resting-page.component.html',
  styleUrl: './exhaustion-resting-page.component.scss'
})
export class ExhaustionRestingPageComponent {
  public readonly pageId = 'exhaustion-resting';
}
