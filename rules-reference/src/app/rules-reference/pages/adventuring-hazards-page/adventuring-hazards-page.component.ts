import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-adventuring-hazards-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './adventuring-hazards-page.component.html',
  styleUrl: './adventuring-hazards-page.component.scss'
})
export class AdventuringHazardsPageComponent {
  public readonly pageId = 'adventuring-hazards';
}
