import { Component } from '@angular/core';
import { TableOfContentsSidebarComponent as BaseTableOfContentsSidebarComponent } from '../../../shared/components/table-of-contents-sidebar/table-of-contents-sidebar.component';
import { PlayerRulesNavigationService } from '../../services/player-rules-navigation.service';

@Component({
  selector: 'app-player-rules-table-of-contents-sidebar',
  imports: [BaseTableOfContentsSidebarComponent],
  template: `<app-base-table-of-contents-sidebar
    [navigationService]="navigationService"
    [title]="'Player Rules'"
  />`
})
export class PlayerRulesTableOfContentsSidebarComponent {
  constructor(
    public navigationService: PlayerRulesNavigationService
  ) {}
}
