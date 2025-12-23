import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-combat-round-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './combat-round-page.component.html',
  styleUrl: './combat-round-page.component.scss'
})
export class CombatRoundPageComponent {
  public readonly pageId = 'combat-round';
}
