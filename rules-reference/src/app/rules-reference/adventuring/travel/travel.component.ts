import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import travelJson from '../../../../../../common_resources/adventuring/travel.json'

@Component({
    selector: 'app-travel',
    imports: [DynamicContentComponent, KeywordProcessorPipe],
    templateUrl: './travel.component.html',
    styleUrl: './travel.component.scss'
})
export class TravelComponent {

  public readonly overlandMovement = travelJson.overlandMovement;
  public readonly terrain = travelJson.terrain;
  public readonly specialMovement = travelJson.specialMovement;
  public readonly tracking = travelJson.tracking;
  public readonly visionAndSenses = travelJson.visionAndSenses;

}
