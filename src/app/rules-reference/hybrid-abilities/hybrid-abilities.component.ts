import { Component } from '@angular/core';
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";

import hybridAbilitiesJson from '../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities.json';

@Component({
  selector: 'app-hybrid-abilities',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './hybrid-abilities.component.html',
  styleUrl: './hybrid-abilities.component.scss'
})
export class HybridAbilitiesComponent {
  public hybridAbilityDescription = hybridAbilitiesJson.hybridAbilitiesDescription;
}
