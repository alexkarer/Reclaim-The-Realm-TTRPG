import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import deathAndRessurectionJson from '../../../../../ttrpg_resources/adventuring/death_and_resurrection.json'

@Component({
  selector: 'app-death-and-resurrection',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './death-and-resurrection.component.html',
  styleUrl: './death-and-resurrection.component.scss'
})
export class DeathAndResurrectionComponent {
  public readonly massiveInjuries = deathAndRessurectionJson.massiveInuries;
}
