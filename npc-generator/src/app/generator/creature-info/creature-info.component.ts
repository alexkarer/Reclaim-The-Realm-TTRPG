import { Component, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NpcRepository } from '../../npc/npc.repository';
import { Alignment, alignments } from '../../npc/alignments';

import levelJson from '../../../resources/levels.json';

@Component({
  selector: 'rtr-npcgen-creature-info',
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './creature-info.component.html',
  styleUrl: './creature-info.component.scss'
})
export class CreatureInfoComponent {

  readonly alignments = alignments;
  readonly levelNumbers = levelJson.map(lvl => lvl.level);

  readonly npcRepo = inject(NpcRepository);

  handleNameUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    this.npcRepo.updateName(target.value);
  }

  handleAlignmentUpdate(event: Event): void {
    let target = event.target as HTMLInputElement;
    let alignment = target.value as Alignment;
    this.npcRepo.updateAlignment(alignment);
  }

  handleLevelUpdate(levelNumber: number): void {
    let levelConfig = levelJson.find(lvlConfig => lvlConfig.level === levelNumber);
    if (levelConfig) {
      this.npcRepo.updateLevel(levelConfig);
    } else {
      console.error('Level ' + levelNumber + ' not found in level configs!');
    }
  }

}
