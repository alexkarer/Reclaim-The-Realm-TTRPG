import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PlayerRulesNavigationService, PlayerRulePage } from '../../services/player-rules-navigation.service';

@Component({
  selector: 'app-table-of-contents-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './table-of-contents-sidebar.component.html',
  styleUrl: './table-of-contents-sidebar.component.scss'
})
export class TableOfContentsSidebarComponent implements OnInit {
  topLevelPages: PlayerRulePage[] = [];
  pageChildren: Map<string, PlayerRulePage[]> = new Map();

  constructor(private navigationService: PlayerRulesNavigationService) {}

  ngOnInit(): void {
    this.topLevelPages = this.navigationService.getTopLevelPages();
    this.topLevelPages.forEach(page => {
      const children = this.navigationService.getChildPages(page.id);
      if (children.length > 0) {
        this.pageChildren.set(page.id, children);
      }
    });
  }

  getChildren(pageId: string): PlayerRulePage[] {
    return this.pageChildren.get(pageId) || [];
  }

  hasChildren(pageId: string): boolean {
    return this.pageChildren.has(pageId);
  }
}
