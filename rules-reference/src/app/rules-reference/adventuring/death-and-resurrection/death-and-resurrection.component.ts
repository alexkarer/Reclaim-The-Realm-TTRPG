import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import deathAndRessurectionJson from '../../../../../../common_resources/adventuring/death_and_resurrection.json'

@Component({
    selector: 'app-death-and-resurrection',
    imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
    templateUrl: './death-and-resurrection.component.html',
    styleUrl: './death-and-resurrection.component.scss'
})
export class DeathAndResurrectionComponent {
  public readonly description = deathAndRessurectionJson.description;
  public readonly reducedTo0Hp = deathAndRessurectionJson.reducedTo0HP;
  public readonly massiveInjuries = deathAndRessurectionJson.massiveInuries;
  public readonly recoverFromBeingUnconcious = deathAndRessurectionJson.recoverFromBeingUnconcious;
  public readonly resurrection = deathAndRessurectionJson.resurrection;
}
