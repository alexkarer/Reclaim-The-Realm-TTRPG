import { Component } from '@angular/core';
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";

import hybridAbilitiesDescriptionJson from '../../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities_description.json';

@Component({
  selector: 'app-hybrid-abilities',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './hybrid-abilities.component.html',
  styleUrl: './hybrid-abilities.component.scss'
})
export class HybridAbilitiesComponent {
  public readonly hybridAbilityDescription = hybridAbilitiesDescriptionJson;
}
