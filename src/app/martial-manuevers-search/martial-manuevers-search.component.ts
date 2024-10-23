import { Component } from '@angular/core';
import { basicManeuvers, ManeuverCollection, MartialManeuver, advancedManeuvers, masterManeuvers, transcendentManeuvers, transcendentTacticalManeuvers } from '../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { AbilityListComponent } from "../shared/ability/ability-list/ability-list.component";
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-martial-manuevers-search',
  standalone: true,
  imports: [AbilityListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem],
  templateUrl: './martial-manuevers-search.component.html',
  styleUrl: './martial-manuevers-search.component.scss'
})
export class MartialManueversSearchComponent {
  private allManeuvers: MartialManeuver[] = [];
  public filteredManeuvers: MartialManeuver[] = [];
  public readonly ManeuverLevel = MenueverLevel;
  public readonly ManeuverType = MenueverType;

  private currentSelectedManeuverLevel = MenueverLevel.ALL;
  private currentSelectedManeuverType = MenueverType.ALL;
  private currentFilterText: string | null = null;

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

  public onFreeTextFilterChange(event: Event) {
    if (event instanceof InputEvent) {
      console.log('works!, data: ' + event.data);
      this.currentFilterText = event.data;
      this.applyCurrentFilters();
    }
  }

  private applyCurrentFilters() {
    this.filteredManeuvers = [...this.allManeuvers
      .filter(m => {
        if (this.currentSelectedManeuverLevel === MenueverLevel.ALL) {
          return true;
        }
        return m.tags.find(tag => tag.includes(this.currentSelectedManeuverLevel));
      })
      .filter(m => {
        if (this.currentSelectedManeuverType === MenueverType.ALL) {
          return true;
        }
        return m.tags.find(tag => tag.includes(this.currentSelectedManeuverType));
      })
      .filter(m => {
        if (this.currentFilterText === null) {
          return true;
        }
        let text = this.currentFilterText;
        return m.name.includes(text) || m.tags.find(tag => tag.includes(text));
      })
      .filter(m => m.name.length !== 0)
    ];
  }
}

enum MenueverLevel {
  ALL = 'all', BASIC = 'Basic', ADVANCED = 'Advanced', MASTER = 'Master', TRANSCENDENT = 'Transcendent'
}

enum MenueverType {
  ALL = 'all', AGILE = 'Agile', BRAWL = 'Brawl', FORTITUDE = 'Fortitude', LEADER = 'Leader', TACTICAL = 'Tactical', WEAPON = 'Weapon'
}

