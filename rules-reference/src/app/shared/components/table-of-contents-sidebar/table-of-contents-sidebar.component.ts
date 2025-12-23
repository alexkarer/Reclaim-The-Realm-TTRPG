import { Component, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-base-table-of-contents-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './table-of-contents-sidebar.component.html',
  styleUrl: './table-of-contents-sidebar.component.scss'
})
export class TableOfContentsSidebarComponent {
  @Input() navigationService!: NavigationService;
  title = input<string>('Table of Contents');

  get topLevelPages() {
    return this.navigationService?.getTopLevelPages() || [];
  }

  getChildPages(parentId: string) {
    return this.navigationService?.getChildPages(parentId) || [];
  }
}
