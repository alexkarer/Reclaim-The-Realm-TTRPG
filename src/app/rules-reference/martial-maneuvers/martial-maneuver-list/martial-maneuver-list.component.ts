import { Component, Input, OnInit } from '@angular/core';
import { ManeuverCollection, MartialManeuver } from '../../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-list.component";

@Component({
  selector: 'app-martial-maneuver-list',
  standalone: true,
  imports: [AbilityListComponent],
  templateUrl: './martial-maneuver-list.component.html',
  styleUrl: './martial-maneuver-list.component.scss'
})
export class MartialManeuverListComponent implements OnInit {
  @Input() public martialManeuvers?: ManeuverCollection;

  public agileMartialManeuvers: MartialManeuver[] = [];
  public brawlMartialManeuvers: MartialManeuver[] = [];
  public leaderMartialManeuvers: MartialManeuver[] = [];
  public fortitudeMartialManeuvers: MartialManeuver[] = [];
  public tacticalMartialManeuvers: MartialManeuver[] = [];
  public weaponMartialManeuvers: MartialManeuver[] = [];

  ngOnInit(): void {
    if (this.martialManeuvers?.agileManeuvers) {
      this.agileMartialManeuvers = this.martialManeuvers?.agileManeuvers
    }
    if (this.martialManeuvers?.brawlManeuvers) {
      this.brawlMartialManeuvers = this.martialManeuvers?.brawlManeuvers
    }
    if (this.martialManeuvers?.leaderManeuvers) {
      this.leaderMartialManeuvers = this.martialManeuvers?.leaderManeuvers
    }
    if (this.martialManeuvers?.fortitudeManeuvers) {
      this.fortitudeMartialManeuvers = this.martialManeuvers?.fortitudeManeuvers
    }
    if (this.martialManeuvers?.tacticalManeuvers) {
      this.tacticalMartialManeuvers = this.martialManeuvers?.tacticalManeuvers
    }
    if (this.martialManeuvers?.weaponManeuvers) {
      this.weaponMartialManeuvers = this.martialManeuvers?.weaponManeuvers
    }
  }
}
