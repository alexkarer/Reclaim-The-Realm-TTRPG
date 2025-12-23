import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService, NavigationPage } from '../../services/navigation.service';

@Component({
  selector: 'app-base-page-navigation',
  imports: [RouterLink],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss'
})
export class PageNavigationComponent implements OnInit {
  currentPageId = input<string>('');
  @Input() navigationService!: NavigationService;
  tocRoute= input<string>('/');

  previousPage: NavigationPage | null = null;
  nextPage: NavigationPage | null = null;

  ngOnInit(): void {
    this.updateNavigation();
  }

  private updateNavigation(): void {
    if (!this.navigationService) {
      console.warn('NavigationService not provided to PageNavigationComponent');
      return;
    }
    this.previousPage = this.navigationService.getPreviousPage(this.currentPageId());
    this.nextPage = this.navigationService.getNextPage(this.currentPageId());
  }
}
