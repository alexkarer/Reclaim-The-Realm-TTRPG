import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NpcRepository } from '../../npc/npc.repository';
import { Ability, Reaction } from '../../npc/npc';

import abilitiesJson from '../../../resources/abilities.json';

@Component({
  selector: 'rtr-npcgen-pre-defined-abilities',
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './pre-defined-abilities.component.html',
  styleUrl: './pre-defined-abilities.component.scss'
})
export class PreDefinedAbilitiesComponent {

  readonly abilities = abilitiesJson;

  readonly npcRepo = inject(NpcRepository);

  handleAbilityCheckBoxUpdate(event: Event, ability: Ability): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addPreDefinedAbility(ability);
    } else {
      this.npcRepo.removePreDefinedAbility(ability);
    }
  }

  handleReactionCheckBoxUpdate(event: Event, reaction: Reaction): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.npcRepo.addReaction(reaction);
    } else {
      this.npcRepo.removeReaction(reaction);
    }
  }
}
