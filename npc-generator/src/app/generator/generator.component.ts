import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ability } from '../npc/npc';
import { CommonModule } from '@angular/common';
import { NpcRepository } from '../npc/npc.repository';
import { combineLatest, map, Observable } from 'rxjs';
import { CustomAbilityComponent } from "./custom-ability/custom-ability.component"; 
import { CreatureInfoComponent } from "./creature-info/creature-info.component";
import { CreaturePropertiesComponent } from './creature-properties/creature-properties.component';
import { AttributeBoostComponent } from './attribute-boost/attribute-boost.component';
import { CreatureTraitsComponent } from './creature-traits/creature-traits.component';
import { PreDefinedAbilitiesComponent } from './pre-defined-abilities/pre-defined-abilities.component';

import creatureTypesJson from '../../resources/creature_types.json'; 

@Component({
    selector: 'rtr-npcgen-generator',
    imports: [NgbDropdownModule, CommonModule, CustomAbilityComponent, CreatureInfoComponent, CreaturePropertiesComponent, AttributeBoostComponent, CreatureTraitsComponent, PreDefinedAbilitiesComponent],
    templateUrl: './generator.component.html',
    styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  currentCustomAbility!: Ability;

  readonly npcRepo = inject(NpcRepository);

  constructor() {
    this.npcRepo.updateCreatureType(creatureTypesJson[0]);
  }

  npcCreationPointsExceeded(): Observable<boolean> {
    return combineLatest({availiblePoints: this.npcRepo.$availibleNpcCreationPoints, usedPoints: this.npcRepo.$usedNpcCreationPoints})
        .pipe(map(points => (points.availiblePoints - points.usedPoints) < 0));
  }

  handleCustomAbilityCreation(): void {
    if (this.currentCustomAbility) {
      this.npcRepo.addCustomAbility(this.currentCustomAbility);
    }
  }
}