import { Injectable } from '@angular/core';
import { NavigationService, NavigationPage } from '../../shared/services/navigation.service';

export type PlayerRulePage = NavigationPage;

@Injectable({
  providedIn: 'root'
})
export class PlayerRulesNavigationService extends NavigationService {

  constructor() {
    super();
    this.setPages([
      { id: 'character-creation', title: 'Creating a Character', route: '/player-rules/character-creation', order: 1 },
      { id: 'species', title: 'Species', route: '/player-rules/species', parent: 'character-creation', order: 2 },
      { id: 'character-origin', title: 'Character Origin', route: '/player-rules/character-origin', parent: 'character-creation', order: 3 },
      { id: 'classes', title: 'Classes', route: '/player-rules/classes', parent: 'character-creation', order: 4 },
      { id: 'attributes-skills', title: 'Attributes and Skills', route: '/player-rules/attributes-skills', parent: 'character-creation', order: 5 },
      { id: 'character-values', title: 'Set Character Values', route: '/player-rules/character-values', parent: 'character-creation', order: 6 },
      { id: 'perks-abilities', title: 'Perks and Abilities', route: '/player-rules/perks-abilities', parent: 'character-creation', order: 7 },
      { id: 'equipment', title: 'Equipment', route: '/player-rules/equipment', parent: 'character-creation', order: 8 },
      { id: 'party-origin', title: 'Optional: Party Origin', route: '/player-rules/party-origin', parent: 'character-creation', order: 9 },
      { id: 'getting-stronger', title: 'Getting Stronger', route: '/player-rules/getting-stronger', order: 10 },
      { id: 'exhaustion-resting', title: 'Exhaustion and Resting', route: '/player-rules/exhaustion-resting', order: 11 },
      { id: 'casting-spells', title: 'Casting Spells', route: '/player-rules/casting-spells', order: 12 }
    ]);
  }
}
