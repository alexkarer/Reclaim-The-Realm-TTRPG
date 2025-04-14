import { Component } from '@angular/core';
import { PerkListComponent } from "./perk-list/perk-list.component";
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { allPerks, Perk } from '../../../../common_resources/perks/perk';

@Component({
    selector: 'app-perk-search',
    imports: [PerkListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule],
    templateUrl: './perk-search.component.html',
    styleUrl: './perk-search.component.scss'
})
export class PerkSearchComponent {

  public filteredPerks: Perk[] = allPerks;

  public readonly PerkTags = PerkTags;

  public selectedPerkTag = PerkTags.ALL;
  public selectedRepeatable = false;
  public currentFilterText = "";

  public onPerkTagFilterChange(perkTag: PerkTags): void {
    this.selectedPerkTag = perkTag;
    this.applyCurrentFilters();
  }

  public onRepeatablePerksChange(): void {
    this.selectedRepeatable = !this.selectedRepeatable;
    this.applyCurrentFilters();
  }

  public onFreeTextFilterChange(): void {
    this.applyCurrentFilters();
  }

  private applyCurrentFilters() {
    this.filteredPerks = [...allPerks
      .filter(m => this.filterForPerkTags(m))
      .filter(m => this.filterForRepeatable(m))
      .filter(m => this.filterforFreeText(m))
      .filter(m => m.name.length !== 0)
    ];
  }

  private filterForPerkTags(perk:  Perk): boolean {
    switch(this.selectedPerkTag) {
      case PerkTags.ALL: return true;
      case PerkTags.CRAFTING: return perk.tags.find(tag => tag.toLowerCase().includes('crafting')) !== undefined;
      case PerkTags.DEFENSIVE: return perk.tags.find(tag => tag.toLowerCase().includes('defensive')) !== undefined;
      case PerkTags.MARTIAL: return perk.tags.find(tag => tag.toLowerCase().includes('martial')) !== undefined;
      case PerkTags.OTHER: return perk.tags.find(tag => tag.toLowerCase().includes('other')) !== undefined;
      case PerkTags.SKILL: return perk.tags.find(tag => tag.toLowerCase().includes('skill')) !== undefined;
      case PerkTags.SPELL: return perk.tags.find(tag => tag.toLowerCase().includes('spell')) !== undefined;
    }
  }

  private filterForRepeatable(perk: Perk): boolean {
    if (this.selectedRepeatable) {
      return perk.tags.find(tag => tag.toLocaleLowerCase().includes('repeatable')) !== undefined;
    }
    return true;
  }

  private filterforFreeText(perk: Perk): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return perk.name.toLocaleLowerCase().includes(text) || 
      perk.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined ||
      perk.description.toLocaleLowerCase().includes(text);
  }
}

enum PerkTags {
  ALL = 'All Perks', CRAFTING = 'Crafting Perks', DEFENSIVE = 'Defensive Perks', MARTIAL = 'Martial Perks', OTHER = 'Other Perks', SKILL = 'Skill Perks', SPELL = 'Spell Perks'
}
