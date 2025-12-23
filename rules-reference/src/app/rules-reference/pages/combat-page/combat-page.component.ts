import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-combat-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './combat-page.component.html',
  styleUrl: './combat-page.component.scss'
})
export class CombatPageComponent {
  public readonly pageId = 'combat';
}
