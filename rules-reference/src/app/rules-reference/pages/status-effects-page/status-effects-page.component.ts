import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-status-effects-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './status-effects-page.component.html',
  styleUrl: './status-effects-page.component.scss'
})
export class StatusEffectsPageComponent {
  public readonly pageId = 'status-effects';
}
