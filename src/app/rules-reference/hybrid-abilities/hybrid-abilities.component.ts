import { Component } from '@angular/core';
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";
import { HybridAbilityListComponent } from "./hybrid-ability-list/hybrid-ability-list.component";
import { noviceHybridAbilities, advancedHybridAbilities, masterHybridAbilities, martialFocusedHybridAbilities, spellFocusedHybridAbilities } from '../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';

import hybridAbilitiesJson from '../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities.json';

@Component({
  selector: 'app-hybrid-abilities',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, HybridAbilityListComponent, NgbScrollSpyFragment],
  templateUrl: './hybrid-abilities.component.html',
  styleUrl: './hybrid-abilities.component.scss'
})
export class HybridAbilitiesComponent {
  public readonly hybridAbilityDescription = hybridAbilitiesJson.hybridAbilitiesDescription;

  public readonly noviceHybridAbilities = noviceHybridAbilities;
  public readonly advancedHybridAbilities = advancedHybridAbilities;
  public readonly masterHybridAbilities = masterHybridAbilities;
  public readonly martialFocusedHybridAbilities = martialFocusedHybridAbilities;
  public readonly spellFocusedHybridAbilities = spellFocusedHybridAbilities;
}
