import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerRulesNavigationService, PlayerRulePage } from '../../services/player-rules-navigation.service';

@Component({
  selector: 'app-page-navigation',
  imports: [RouterLink],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss'
})
export class PageNavigationComponent implements OnInit {
  @Input() currentPageId!: string;

  previousPage: PlayerRulePage | null = null;
  nextPage: PlayerRulePage | null = null;

  constructor(
    private navigationService: PlayerRulesNavigationService
  ) {}

  ngOnInit(): void {
    this.updateNavigation();
  }

  private updateNavigation(): void {
    this.previousPage = this.navigationService.getPreviousPage(this.currentPageId);
    this.nextPage = this.navigationService.getNextPage(this.currentPageId);
  }
}
