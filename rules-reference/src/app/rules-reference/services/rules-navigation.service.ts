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
      { id: 'introduction', title: 'Introduction', route: '/rules/introduction', order: 1 },
      { id: 'core-gameplay', title: 'Core Gameplay', route: '/rules/core-gameplay', parent: 'introduction', order: 2 },
      { id: 'adventuring', title: 'Adventuring', route: '/rules/adventuring',  order: 3 },
      { id: 'travel', title: 'Travel', route: '/rules/travel',  order: 4, parent: 'adventuring' },
      { id: 'riftlands-travel', title: 'Riftlands Travel', route: '/rules/riftlands-travel',  order: 5, parent: 'adventuring' },
      { id: 'adventuring-hazards', title: 'Adventuring Hazards', route: '/rules/adventuring-hazards',  order: 6, parent: 'adventuring' },
      { id: 'combat', title: 'Combat', route: '/rules/combat',  order: 7 },
      { id: 'combat-round', title: 'Combat Round', route: '/rules/combat-round',  order: 8, parent: 'combat' },
      { id: 'status-effects', title: 'Status Effects', route: '/rules/status-effects',  order: 9, parent: 'combat' },
      { id: 'appendix', title: 'Appendix', route: '/rules/appendix',  order: 10 },
      { id: 'useful-tables', title: 'A: Useful Tables', route: '/rules/useful-tables',  order: 11, parent: 'appendix' },
      { id: 'chase-rules', title: 'B: Chase Rules', route: '/rules/chase-rules',  order: 11, parent: 'appendix' }
    ]);
  }
}
