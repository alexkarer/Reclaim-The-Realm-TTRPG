import { Component } from '@angular/core';
import { ALL_TECHNIQUES, Technique } from '../../../../common_resources/player_rules/techniques/technique'
import { AbilityListComponent } from "../shared/ability/ability-list/ability-old-list.component";
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AbilityComponent } from "../shared/components/ability/ability.component";

@Component({
    selector: 'app-techniques-search',
    imports: [AbilityListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule, AbilityComponent],
    templateUrl: './techniques-search.component.html',
    styleUrl: './techniques-search.component.scss'
})
export class TechniquesSearchComponent {
  public filteredTechniques: Technique[] = ALL_TECHNIQUES;
  public readonly TechniqueLevel = TechniqueLevel;
  public readonly TechniqueType = TechniqueType;
  public readonly TechniqueCost = TechniqueCost;
  public currentFilterText: string = "";

  private currentSelectedTechniqueLevel = TechniqueLevel.ALL;
  private currentSelectedTechniqueType = TechniqueType.ALL;
  private currentSelectedTechniqueCost = TechniqueCost.ANY;

  public onTechniqueLevelFilterChange(techniqueLevel: TechniqueLevel): void {
    this.currentSelectedTechniqueLevel = techniqueLevel;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedLevelText(): string  {
    switch(this.currentSelectedTechniqueLevel) {
      case TechniqueLevel.ALL: return 'All Technique Levels';
      case TechniqueLevel.BASIC: return 'Basic Techniques';
      case TechniqueLevel.ADVANCED: return 'Advanced Techniques';
      case TechniqueLevel.MASTER: return 'Master Techniques';
      case TechniqueLevel.TRANSCENDENT: return 'Transcendent Techniques';
      default : return 'error';
    }
  }

  public onTechniqueTypeFilterChange(martialTechniqueType: TechniqueType): void {
    this.currentSelectedTechniqueType = martialTechniqueType;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedTypeText(): string  {
    switch(this.currentSelectedTechniqueType) {
      case TechniqueType.ALL: return 'All Technique Types';
      case TechniqueType.AGILE: return 'Agile Techniques';
      case TechniqueType.BRAWL: return 'Brawl Techniques';
      case TechniqueType.FORTITUDE: return 'Fortitude Techniques';
      case TechniqueType.LEADER: return 'Leader Techniques';
      case TechniqueType.TACTICAL: return 'Tactical Techniques';
      default : return 'error';
    }
  }

  public onTechniqueCostChange(maneuverCost: TechniqueCost): void {
    this.currentSelectedTechniqueCost = maneuverCost;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedTechniqueCostText(): string  {
    switch(this.currentSelectedTechniqueCost) {
      case TechniqueCost.ANY: return 'Any Ability Cost';
      case TechniqueCost.MP: return 'Techniques with [MP] Cost';
      case TechniqueCost.AP1: return 'Techniques with 1 [AP] Cost';
      case TechniqueCost.AP2: return 'Techniques with 2 [AP] Cost';
      case TechniqueCost.AP3: return 'Techniques with 3 [AP] Cost';
      case TechniqueCost.AP4: return 'Techniques with 4 [AP] Cost';
      case TechniqueCost.AP5: return 'Techniques with 5 [AP] Cost';
      case TechniqueCost.AP6: return 'Techniques with 6 [AP] Cost';
      default : return 'error';
    }
  }

  public onFreeTextFilterChange() {
    this.applyCurrentFilters();
  }

  private applyCurrentFilters() {
    this.filteredTechniques = ALL_TECHNIQUES
      .filter(m => this.filterForTechniqueLevel(m))
      .filter(m => this.filterForTechniqueType(m))
      .filter(m => this.filterForTechniqueCost(m))
      .filter(m => this.filterforFreeText(m))
      .filter(m => m.name.length !== 0)
  }

  private filterForTechniqueLevel(technique: Technique): boolean {
    if (this.currentSelectedTechniqueLevel === TechniqueLevel.ALL) {
      return true;
    }
    return technique.tags.find(tag => tag.includes(this.currentSelectedTechniqueLevel)) !== undefined;
  }

  private filterForTechniqueType(technique: Technique): boolean | undefined {
    if (this.currentSelectedTechniqueType === TechniqueType.ALL) {
      return true;
    }
    return technique.tags.find(tag => tag.includes(this.currentSelectedTechniqueType)) !== undefined;
  }

  private filterForTechniqueCost(technique: Technique): boolean {
    let keep = false;
    switch (this.currentSelectedTechniqueCost) {
      case TechniqueCost.ANY: keep = true; break;
      case TechniqueCost.MP: keep = (technique.cost.mp > 0); break;
      case TechniqueCost.AP0: keep = (technique.cost.ap == 0); break;
      case TechniqueCost.AP1: keep = (technique.cost.ap == 1); break;
      case TechniqueCost.AP2: keep = (technique.cost.ap == 2); break;
      case TechniqueCost.AP3: keep = (technique.cost.ap == 3); break;
      case TechniqueCost.AP4: keep = (technique.cost.ap == 4); break;
      case TechniqueCost.AP5: keep = (technique.cost.ap == 5); break;
      case TechniqueCost.AP6: keep = (technique.cost.ap == 6); break;
    }
    return keep;
  }

  private filterforFreeText(technique: Technique): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return technique.name.toLocaleLowerCase().includes(text) || 
      technique.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined;
  }
}

enum TechniqueLevel {
  ALL = 'all', BASIC = 'Basic', ADVANCED = 'Advanced', MASTER = 'Master', TRANSCENDENT = 'Transcendent'
}

enum TechniqueType {
  ALL = 'all', AGILE = 'Agile', BRAWL = 'Brawl', FORTITUDE = 'Fortitude', LEADER = 'Leader', TACTICAL = 'Tactical'
}

enum TechniqueCost {
  ANY, MP, AP0, AP1, AP2, AP3, AP4, AP5, AP6
}