import { Injectable } from '@angular/core';

export interface PlayerRulePage {
  id: string;
  title: string;
  route: string;
  parent?: string;
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerRulesNavigationService {

  private readonly pages: PlayerRulePage[] = [
    { id: 'character-creation', title: 'Creating a Character', route: '/player-rules/character-creation', order: 1 },
    { id: 'species', title: 'Species', route: '/player-rules/species', parent: 'character-creation', order: 2 },
    { id: 'character-origin', title: 'Character Origin', route: '/player-rules/character-origin', parent: 'character-creation', order: 3 },
    { id: 'classes', title: 'Classes', route: '/player-rules/classes', parent: 'character-creation', order: 4 },
    { id: 'attributes-skills', title: 'Attributes and Skills', route: '/player-rules/attributes-skills', parent: 'character-creation', order: 5 },
    { id: 'character-values', title: 'Set Character Values', route: '/player-rules/character-values', parent: 'character-creation', order: 6 },
    { id: 'perks-abilities', title: 'Perks and Abilities', route: '/player-rules/perks-abilities', parent: 'character-creation', order: 7 },
    { id: 'finish-character', title: 'Finish up your Character', route: '/player-rules/finish-character', parent: 'character-creation', order: 8 },
    { id: 'equipment', title: 'Equipment', route: '/player-rules/equipment', parent: 'character-creation', order: 9 },
    { id: 'party-origin', title: 'Optional: Party Origin', route: '/player-rules/party-origin', parent: 'character-creation', order: 10 },
    { id: 'getting-stronger', title: 'Getting Stronger', route: '/player-rules/getting-stronger', order: 11 },
    { id: 'exhaustion-resting', title: 'Exhaustion and Resting', route: '/player-rules/exhaustion-resting', order: 12 },
    { id: 'spells', title: 'Spells', route: '/player-rules/spells', order: 13 }
  ];

  constructor() { }

  getAllPages(): PlayerRulePage[] {
    return [...this.pages];
  }

  getPage(id: string): PlayerRulePage | undefined {
    return this.pages.find(page => page.id === id);
  }

  getPageByRoute(route: string): PlayerRulePage | undefined {
    return this.pages.find(page => page.route === route);
  }

  getNextPage(currentPageId: string): PlayerRulePage | null {
    const currentPage = this.getPage(currentPageId);
    if (!currentPage) return null;

    const nextPage = this.pages.find(page => page.order === currentPage.order + 1);
    return nextPage || null;
  }

  getPreviousPage(currentPageId: string): PlayerRulePage | null {
    const currentPage = this.getPage(currentPageId);
    if (!currentPage) return null;

    const previousPage = this.pages.find(page => page.order === currentPage.order - 1);
    return previousPage || null;
  }

  getTopLevelPages(): PlayerRulePage[] {
    return this.pages.filter(page => !page.parent);
  }

  getChildPages(parentId: string): PlayerRulePage[] {
    return this.pages.filter(page => page.parent === parentId);
  }
}
