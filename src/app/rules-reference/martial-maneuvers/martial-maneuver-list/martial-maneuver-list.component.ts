import { Component, Input, OnInit } from '@angular/core';
import { MartialManeuver } from '../../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
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
  @Input() public title?: string;
  @Input() public martialManeuvers?: MartialManeuver[];

  public martialManeuversLeft: MartialManeuver[] = [];
  public martialManeuversRight: MartialManeuver[] = [];


  ngOnInit(): void {
    this.martialManeuversLeft = halveArray(this.martialManeuvers)[0];
    this.martialManeuversRight = halveArray(this.martialManeuvers)[1];
  }
}
