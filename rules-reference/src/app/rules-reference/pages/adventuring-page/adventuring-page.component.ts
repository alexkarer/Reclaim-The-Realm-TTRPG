import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-adventuring-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './adventuring-page.component.html',
  styleUrl: './adventuring-page.component.scss'
})
export class AdventuringPageComponent {
  public readonly pageId = 'adventuring';
}
