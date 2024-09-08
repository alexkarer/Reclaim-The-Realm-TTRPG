import { Component, Input, OnInit } from '@angular/core';
import { HybridAbilityCollection, HybridAbility } from '../../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';
import { halveArray } from '../../../shared/utils/array-utils';
import { AbilityComponent } from "../../../shared/ability/ability.component";

@Component({
  selector: 'app-hybrid-ability-list',
  standalone: true,
  imports: [AbilityComponent],
  templateUrl: './hybrid-ability-list.component.html',
  styleUrl: './hybrid-ability-list.component.scss'
})
export class HybridAbilityListComponent implements OnInit {

  @Input() hybridAbilities?: HybridAbilityCollection;

  public elementalHybridAbilitiesLeft: HybridAbility[] = [];
  public elementalHybridAbilitiesRight: HybridAbility[] = [];

  public cosmicHybridAbilitiesLeft: HybridAbility[] = [];
  public cosmicHybridAbilitiesRight: HybridAbility[] = [];

  public manipulationHybridAbilitiesLeft: HybridAbility[] = [];
  public manipulationHybridAbilitiesRight: HybridAbility[] = [];

  ngOnInit(): void {
    this.elementalHybridAbilitiesLeft = halveArray(this.hybridAbilities?.elementalHybridAbilities)[0];
    this.elementalHybridAbilitiesRight = halveArray(this.hybridAbilities?.elementalHybridAbilities)[1];

    this.cosmicHybridAbilitiesLeft = halveArray(this.hybridAbilities?.cosmicHybridAbilities)[0];
    this.cosmicHybridAbilitiesRight = halveArray(this.hybridAbilities?.cosmicHybridAbilities)[1];

    this.manipulationHybridAbilitiesLeft = halveArray(this.hybridAbilities?.manipulationHybridAbilities)[0];
    this.manipulationHybridAbilitiesRight = halveArray(this.hybridAbilities?.manipulationHybridAbilities)[1];
  }
}
