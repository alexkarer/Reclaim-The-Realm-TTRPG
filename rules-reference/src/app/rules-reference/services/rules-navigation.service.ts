import { Injectable } from '@angular/core';
import { NavigationService, NavigationPage } from '../../shared/services/navigation.service';

export type RulesPage = NavigationPage;

@Injectable({
  providedIn: 'root'
})
export class RulesNavigationService extends NavigationService {

  constructor() {
    super();
    this.setPages([
      { order: 1, id: 'introduction', title: 'Introduction', route: '/rules/introduction' },
      { order: 2, id: 'core-gameplay', title: 'Core Gameplay', route: '/rules/core-gameplay', parent: 'introduction' },
      { order: 3, id: 'adventuring', title: 'Adventuring', route: '/rules/adventuring' },
      { order: 4, id: 'travel', title: 'Travel', route: '/rules/travel', parent: 'adventuring' },
      { order: 5, id: 'riftlands-travel', title: 'Riftlands Travel', route: '/rules/riftlands-travel', parent: 'adventuring' },
      { order: 6, id: 'adventuring-hazards', title: 'Adventuring Hazards', route: '/rules/adventuring-hazards', parent: 'adventuring' },
      { order: 7, id: 'combat', title: 'Combat', route: '/rules/combat' },
      { order: 8, id: 'combat-round', title: 'Combat Round', route: '/rules/combat-round', parent: 'combat' },
      { order: 9, id: 'movement', title: 'Movement', route: '/rules/movement', parent: 'combat' },
      { order: 10, id: 'abilities', title: 'Abilities', route: '/rules/abilities', parent: 'combat' },
      { order: 11, id: 'status-effects', title: 'Status Effects', route: '/rules/status-effects', parent: 'combat' },
      { order: 12, id: 'appendix', title: 'Appendix', route: '/rules/appendix' },
      { order: 13, id: 'useful-tables', title: 'A: Useful Tables', route: '/rules/useful-tables', parent: 'appendix' },
      { order: 14, id: 'chase-rules', title: 'B: Chase Rules', route: '/rules/chase-rules', parent: 'appendix' }
    ]);
  }
}
