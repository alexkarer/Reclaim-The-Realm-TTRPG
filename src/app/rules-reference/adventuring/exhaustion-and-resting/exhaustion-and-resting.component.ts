import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import exhaustionAndRestingJson from '../../../../../ttrpg_resources/adventuring/exhaustion_and_resting.json'

@Component({
  selector: 'app-exhaustion-and-resting',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
  templateUrl: './exhaustion-and-resting.component.html',
  styleUrl: './exhaustion-and-resting.component.scss'
})
export class ExhaustionAndRestingComponent {
  public readonly description = exhaustionAndRestingJson.description;
  public readonly exhaustion = exhaustionAndRestingJson.exhaustion;
  public readonly shortRest = exhaustionAndRestingJson.shortRest;
  public readonly longRest = exhaustionAndRestingJson.longRest;
  public readonly extendedLongRest = exhaustionAndRestingJson.extendedLongRest;
}
