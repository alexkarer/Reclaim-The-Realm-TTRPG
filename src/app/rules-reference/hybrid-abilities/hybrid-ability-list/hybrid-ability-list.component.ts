import { Component, Input, OnInit } from '@angular/core';
import { HybridAbilityCollection, HybridAbility } from '../../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-list.component";

@Component({
  selector: 'app-hybrid-ability-list',
  standalone: true,
  imports: [AbilityListComponent],
  templateUrl: './hybrid-ability-list.component.html',
  styleUrl: './hybrid-ability-list.component.scss'
})
export class HybridAbilityListComponent implements OnInit {

  @Input() hybridAbilities?: HybridAbilityCollection;

  public elementalHybridAbilities: HybridAbility[] = [];
  public cosmicHybridAbilities: HybridAbility[] = [];
  public manipulationHybridAbilities: HybridAbility[] = [];

  ngOnInit(): void {
    if (this.hybridAbilities?.elementalHybridAbilities) {
      this.elementalHybridAbilities = this.hybridAbilities.elementalHybridAbilities;
    }
    if (this.hybridAbilities?.cosmicHybridAbilities) {
      this.cosmicHybridAbilities = this.hybridAbilities.cosmicHybridAbilities;
    }
    if (this.hybridAbilities?.manipulationHybridAbilities) {
      this.manipulationHybridAbilities = this.hybridAbilities.manipulationHybridAbilities;
    }
  }
}
