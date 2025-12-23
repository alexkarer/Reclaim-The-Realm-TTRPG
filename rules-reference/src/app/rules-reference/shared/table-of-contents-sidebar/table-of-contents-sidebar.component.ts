import { Component } from '@angular/core';
import { TableOfContentsSidebarComponent as BaseTableOfContentsSidebarComponent } from '../../../shared/components/table-of-contents-sidebar/table-of-contents-sidebar.component';
import { RulesNavigationService } from '../../services/rules-navigation.service';

@Component({
  selector: 'app-rules-table-of-contents-sidebar',
  imports: [BaseTableOfContentsSidebarComponent],
  template: `<app-base-table-of-contents-sidebar
    [navigationService]="navigationService"
    [title]="'Rules Reference'"
  />`
})
export class RulesReferenceTableOfContentsSidebarComponent {
  constructor(
    public navigationService: RulesNavigationService
  ) {}
}
