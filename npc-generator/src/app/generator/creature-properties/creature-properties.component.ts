import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NpcRepository } from '../../npc/npc.repository';
import { ArcheTypes } from '../../npc/npc';

import archeTypesJson from '../../../resources/archetypes.json'; 
import creatureTypesJson from '../../../resources/creature_types.json'; 
import creatureSizesJson from '../../../resources/sizes.json'; 

@Component({
  selector: 'rtr-npcgen-creature-properties',
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './creature-properties.component.html',
  styleUrl: './creature-properties.component.scss'
})
export class CreaturePropertiesComponent {
  readonly archTypes = Object.values(ArcheTypes);
  readonly creatureTypes = creatureTypesJson;
  readonly creatureSizes = creatureSizesJson;
  
  selectedArcheType = ArcheTypes.WARRIOR;
  
  readonly npcRepo = inject(NpcRepository);

  handleArcheTypeUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let archeType = target.value as ArcheTypes;
    this.selectedArcheType = archeType;
    switch(archeType) {
      case ArcheTypes.WARRIOR:
        this.npcRepo.updateArcheType(archeTypesJson.warriorProgression);
        break;
      case ArcheTypes.SPELLCASTER:
        this.npcRepo.updateArcheType(archeTypesJson.spellCasterProgression);
        break;
      case ArcheTypes.EXPERT:
        this.npcRepo.updateArcheType(archeTypesJson.expertProgression);
        break;
      default:
        console.error('ArcheType ' + archeType + ' not recognized!');
    }
  }
}
