import { Component, input } from '@angular/core';
import { PageNavigationComponent as BasePageNavigationComponent } from '../../../shared/components/page-navigation/page-navigation.component';
import { RulesNavigationService } from '../../services/rules-navigation.service';

@Component({
  selector: 'app-page-navigation',
  imports: [BasePageNavigationComponent],
  template: `<app-base-page-navigation
    [currentPageId]="currentPageId()"
    [navigationService]="navigationService"
    [tocRoute]="'/rules'"
  />`
})
export class RulesReferencePageNavigationComponent {
  currentPageId = input<string>('');

  constructor(
    public navigationService: RulesNavigationService
  ) {}
}
