import { Component } from '@angular/core';
import { basicManeuvers, ManeuverCollection, MartialManeuver, advancedManeuvers, masterManeuvers, transcendentManeuvers, transcendentTacticalManeuvers } from '../../../../common_resources/martial_maneuvers/martial-maneuvers';
import { AbilityListComponent } from "../shared/ability/ability-list/ability-list.component";
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-martial-manuevers-search',
    imports: [AbilityListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule],
    templateUrl: './martial-manuevers-search.component.html',
    styleUrl: './martial-manuevers-search.component.scss'
})
export class MartialManueversSearchComponent {
  private allManeuvers: MartialManeuver[] = [];
  public filteredManeuvers: MartialManeuver[] = [];
  public readonly ManeuverLevel = MenueverLevel;
  public readonly ManeuverType = MenueverType;
  public readonly ManeuverCost = ManeuverCost;
  public currentFilterText: string = "";

  private currentSelectedManeuverLevel = MenueverLevel.ALL;
  private currentSelectedManeuverType = MenueverType.ALL;
  private currentSelectedManeuverCost = ManeuverCost.ANY;

  constructor() {
    this.allManeuvers.push(...this.collectionToList(basicManeuvers));
    this.allManeuvers.push(...this.collectionToList(advancedManeuvers));
    this.allManeuvers.push(...this.collectionToList(masterManeuvers));
    this.allManeuvers.push(...this.collectionToList(transcendentManeuvers));
    this.applyCurrentFilters();
  }

  collectionToList(collection: ManeuverCollection): MartialManeuver[] {
    let maneuverList: MartialManeuver[] = [];
    maneuverList.push(...collection.agileManeuvers);
    maneuverList.push(...collection.brawlManeuvers);
    maneuverList.push(...collection.fortitudeManeuvers);
    maneuverList.push(...collection.leaderManeuvers);
    maneuverList.push(...collection.tacticalManeuvers);
    maneuverList.push(...collection.weaponManeuvers);

    return maneuverList;
  }

  public onManeuverLevelFilterChange(maneuverLevel: MenueverLevel): void {
    this.currentSelectedManeuverLevel = maneuverLevel;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedLevelText(): string  {
    switch(this.currentSelectedManeuverLevel) {
      case MenueverLevel.ALL: return 'All Maneuver Levels';
      case MenueverLevel.BASIC: return 'Basic Maneuvers';
      case MenueverLevel.ADVANCED: return 'Advanced Maneuvers';
      case MenueverLevel.MASTER: return 'Master Maneuvers';
      case MenueverLevel.TRANSCENDENT: return 'Transcendent Maneuvers';
      default : return 'error';
    }
  }

  public onManeuverTypeFilterChange(martialManeuverType: MenueverType): void {
    this.currentSelectedManeuverType = martialManeuverType;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedTypeText(): string  {
    switch(this.currentSelectedManeuverType) {
      case MenueverType.ALL: return 'All Maneuver Types';
      case MenueverType.AGILE: return 'Agile Maneuvers';
      case MenueverType.BRAWL: return 'Brawl Maneuvers';
      case MenueverType.FORTITUDE: return 'Fortitude Maneuvers';
      case MenueverType.LEADER: return 'Leader Maneuvers';
      case MenueverType.TACTICAL: return 'Tactical Maneuvers';
      case MenueverType.WEAPON: return 'Weapon Maneuvers'
      default : return 'error';
    }
  }

  public onManeuverCostChange(maneuverCost: ManeuverCost): void {
    this.currentSelectedManeuverCost = maneuverCost;
    this.applyCurrentFilters();
  }

  public getCurrentlySelectedManeuverCostText(): string  {
    switch(this.currentSelectedManeuverCost) {
      case ManeuverCost.ANY: return 'Any Ability Cost';
      case ManeuverCost.MP: return 'Maneuvers with [MP] Cost';
      case ManeuverCost.REACTION: return 'Maneuvers with [REACTION] Cost';
      case ManeuverCost.AP1: return 'Maneuvers with 1 [AP] Cost';
      case ManeuverCost.AP2: return 'Maneuvers with 2 [AP] Cost';
      case ManeuverCost.AP3: return 'Maneuvers with 3 [AP] Cost';
      case ManeuverCost.AP4: return 'Maneuvers with 4 [AP] Cost';
      case ManeuverCost.AP5: return 'Maneuvers with 5 [AP] Cost';
      case ManeuverCost.AP6: return 'Maneuvers with 6 [AP] Cost';
      default : return 'error';
    }
  }

  public onFreeTextFilterChange() {
    this.applyCurrentFilters();
  }

  private applyCurrentFilters() {
    this.filteredManeuvers = [...this.allManeuvers
      .filter(m => this.filterForManeuverLevel(m))
      .filter(m => this.filterForManeuverType(m))
      .filter(m => this.filterForManeuverCost(m))
      .filter(m => this.filterforFreeText(m))
      .filter(m => m.name.length !== 0)
    ];
  }

  private filterForManeuverLevel(m: MartialManeuver): boolean {
    if (this.currentSelectedManeuverLevel === MenueverLevel.ALL) {
      return true;
    }
    return m.tags.find(tag => tag.includes(this.currentSelectedManeuverLevel)) !== undefined;
  }

  private filterForManeuverType(m: MartialManeuver): boolean | undefined {
    if (this.currentSelectedManeuverType === MenueverType.ALL) {
      return true;
    }
    return m.tags.find(tag => tag.includes(this.currentSelectedManeuverType)) !== undefined;
  }

  private filterForManeuverCost(m: MartialManeuver): boolean {
    if (this.currentSelectedManeuverCost === ManeuverCost.ANY) {
      return true;
    }
    return m.cost.includes(this.currentSelectedManeuverCost);
  }

  private filterforFreeText(m: MartialManeuver): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return m.name.toLocaleLowerCase().includes(text) || 
      m.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined ||
      m.description.find(desc => desc.regularText?.toLocaleLowerCase().includes(text)) !== undefined ||
      m.maneuverPush?.pushingDescription.toLowerCase().includes(text);
  }
}

enum MenueverLevel {
  ALL = 'all', BASIC = 'Basic', ADVANCED = 'Advanced', MASTER = 'Master', TRANSCENDENT = 'Transcendent'
}

enum MenueverType {
  ALL = 'all', AGILE = 'Agile', BRAWL = 'Brawl', FORTITUDE = 'Fortitude', LEADER = 'Leader', TACTICAL = 'Tactical', WEAPON = 'Weapon'
}

enum ManeuverCost {
  ANY = 'any', MP = '[MP]', REACTION = '[REACTION]', AP1 = '1 [AP]', AP2 = '2 [AP]', AP3 = '3 [AP]', AP4 = '4 [AP]', AP5 = '5 [AP]', AP6 = '6 [AP]'
}