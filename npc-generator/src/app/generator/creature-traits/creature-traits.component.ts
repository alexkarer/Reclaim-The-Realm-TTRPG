import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NpcRepository } from '../../npc/npc.repository';
import { Trait } from '../../npc/npc';

import traitsJson from '../../../resources/traits.json'; 

@Component({
  selector: 'rtr-npcgen-creature-traits',
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './creature-traits.component.html',
  styleUrl: './creature-traits.component.scss'
})
export class CreatureTraitsComponent {

  readonly traits = traitsJson;

  readonly npcRepo = inject(NpcRepository);

  handleTraitCheckBoxUpdate(event: Event, trait: Trait): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addTrait(trait);
    } else {
      this.npcRepo.removeTrait(trait);
    }
  }
}
