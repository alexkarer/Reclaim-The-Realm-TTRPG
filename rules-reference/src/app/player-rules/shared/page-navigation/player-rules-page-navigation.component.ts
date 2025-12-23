import { Component, input } from '@angular/core';
import { PageNavigationComponent as BasePageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { PlayerRulesNavigationService } from '../../services/player-rules-navigation.service';

@Component({
  selector: 'app-player-rules-page-navigation',
  imports: [BasePageNavigationComponent],
  template: `<app-base-page-navigation
    [currentPageId]="currentPageId()"
    [navigationService]="navigationService"
    [tocRoute]="'/player-rules'"
  />`
})
export class PlayerRulesPageNavigationComponent {
  currentPageId = input<string>('');

  constructor(
    public navigationService: PlayerRulesNavigationService
  ) {}
}
