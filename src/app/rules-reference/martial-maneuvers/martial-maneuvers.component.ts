import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import { halveArray } from '../../shared/utils/array-utils';
import { advancedManeuvers, basicManeuvers, masterManeuvers, transcendentManeuvers } from '../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';

import martialManeuversJson from '../../../../ttrpg_resources/martial_maneuvers/martial_maneuvers_overview.json';

@Component({
  selector: 'app-martial-maneuvers',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './martial-maneuvers.component.html',
  styleUrl: './martial-maneuvers.component.scss'
})
export class MartialManeuversComponent {

  public readonly martialManeuversDescription = martialManeuversJson.martialManeuversDescription;

  public readonly performingMartialManeuversDescription = martialManeuversJson.performingMartialManeuversDescription;
  public readonly martialTestDescription = martialManeuversJson.martialTestDescription;
  public readonly pushingMartialManeuversDescription = martialManeuversJson.pushingMartialManeuversDescription;

  public readonly martialManeuverTypesDescription = martialManeuversJson.martialManeuverTypesDescription;
  public readonly martialManeuverTypesLeft = halveArray(martialManeuversJson.martialManeuverTypes)[0];
  public readonly martialManeuverTypesRight = halveArray(martialManeuversJson.martialManeuverTypes)[1];

  public readonly basicManeuvers = basicManeuvers;
  public readonly advancedManeuvers = advancedManeuvers;
  public readonly masterManeuvers = masterManeuvers;
  public readonly transcendentManeuvers = transcendentManeuvers;
}
