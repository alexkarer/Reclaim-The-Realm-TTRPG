import { Component, Input, OnInit } from '@angular/core';
import { ManeuverCollection, MartialManeuver } from '../../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { halveArray } from '../../../shared/utils/array-utils';
import { AbilityComponent } from "../../../shared/ability/ability.component";

@Component({
  selector: 'app-martial-maneuver-list',
  standalone: true,
  imports: [AbilityComponent],
  templateUrl: './martial-maneuver-list.component.html',
  styleUrl: './martial-maneuver-list.component.scss'
})
export class MartialManeuverListComponent implements OnInit {
  @Input() public martialManeuvers?: ManeuverCollection;

  public agileMartialManeuversLeft: MartialManeuver[] = [];
  public agileMartialManeuversRight: MartialManeuver[] = [];

  public brawlMartialManeuversLeft: MartialManeuver[] = [];
  public brawlMartialManeuversRight: MartialManeuver[] = [];

  public leaderMartialManeuversLeft: MartialManeuver[] = [];
  public leaderMartialManeuversRight: MartialManeuver[] = [];

  public fortitudeMartialManeuversLeft: MartialManeuver[] = [];
  public fortitudeMartialManeuversRight: MartialManeuver[] = [];

  public tacticalMartialManeuversLeft: MartialManeuver[] = [];
  public tacticalMartialManeuversRight: MartialManeuver[] = [];

  public weaponMartialManeuversLeft: MartialManeuver[] = [];
  public weaponMartialManeuversRight: MartialManeuver[] = [];

  ngOnInit(): void {
    this.agileMartialManeuversLeft = halveArray(this.martialManeuvers?.agileManeuvers)[0];
    this.agileMartialManeuversRight = halveArray(this.martialManeuvers?.agileManeuvers)[1];

    this.brawlMartialManeuversLeft = halveArray(this.martialManeuvers?.brawlManeuvers)[0];
    this.brawlMartialManeuversRight = halveArray(this.martialManeuvers?.brawlManeuvers)[1];

    this.leaderMartialManeuversLeft = halveArray(this.martialManeuvers?.leaderManeuvers)[0];
    this.leaderMartialManeuversRight = halveArray(this.martialManeuvers?.leaderManeuvers)[1];

    this.fortitudeMartialManeuversLeft = halveArray(this.martialManeuvers?.fortitudeManeuvers)[0];
    this.fortitudeMartialManeuversRight = halveArray(this.martialManeuvers?.fortitudeManeuvers)[1];

    this.tacticalMartialManeuversLeft = halveArray(this.martialManeuvers?.tacticalManeuvers)[0];
    this.tacticalMartialManeuversRight = halveArray(this.martialManeuvers?.tacticalManeuvers)[1];

    this.weaponMartialManeuversLeft = halveArray(this.martialManeuvers?.weaponManeuvers)[0];
    this.weaponMartialManeuversRight = halveArray(this.martialManeuvers?.weaponManeuvers)[1];
  }
}
