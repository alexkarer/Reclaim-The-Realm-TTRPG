import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-chase-rules-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './chase-rules-page.component.html',
  styleUrl: './chase-rules-page.component.scss'
})
export class ChaseRulesPageComponent {
  public readonly pageId = 'chase-rules';
}
