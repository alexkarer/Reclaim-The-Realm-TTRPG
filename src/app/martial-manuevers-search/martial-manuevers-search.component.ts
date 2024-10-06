import { Component } from '@angular/core';
import { basicManeuvers, ManeuverCollection, MartialManeuver, advancedManeuvers, masterManeuvers, transcendentManeuvers } from '../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { AbilityListComponent } from "../shared/ability/ability-list/ability-list.component";

@Component({
  selector: 'app-martial-manuevers-search',
  standalone: true,
  imports: [AbilityListComponent],
  templateUrl: './martial-manuevers-search.component.html',
  styleUrl: './martial-manuevers-search.component.scss'
})
export class MartialManueversSearchComponent {
  private allManeuvers: MartialManeuver[] = [];
  public filteredManeuvers: MartialManeuver[] = [];

  constructor() {
    this.allManeuvers.push(...this.collectionToList(basicManeuvers));
    this.allManeuvers.push(...this.collectionToList(advancedManeuvers));
    this.allManeuvers.push(...this.collectionToList(masterManeuvers));
    this.allManeuvers.push(...this.collectionToList(transcendentManeuvers));
    this.filteredManeuvers = this.allManeuvers;
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
}
