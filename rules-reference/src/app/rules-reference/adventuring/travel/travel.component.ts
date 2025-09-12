import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import travelJson from '../../../../../../common_resources/adventuring/travel.json'

@Component({
    selector: 'app-travel',
    imports: [DynamicContentComponent, TextProcessorPipe],
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
