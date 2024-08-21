import { Component, Input } from '@angular/core';
import { DynamicContentComponent } from '../dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../text-transformer/text-transformer';
import { Ability } from '../../../../ttrpg_resources/globals/Ability';
import { RequirementsPrettierPipe } from "../utils/to-pretty-string";
import { MartialManeuver } from '../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, RequirementsPrettierPipe],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.scss'
})
export class AbilityComponent {

  @Input() public ability?: Ability;

  public isMartialManeuver(): boolean {
    return this.ability instanceof MartialManeuver;
  }
}
