import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NpcRepository } from '../../npc/npc.repository';
import { combineLatest, map } from 'rxjs';
import { Attributes } from '../../npc/npc';

@Component({
  selector: 'rtr-npcgen-attribute-boost',
  imports: [CommonModule],
  templateUrl: './attribute-boost.component.html',
  styleUrl: './attribute-boost.component.scss'
})
export class AttributeBoostComponent {
  readonly AttributesEnum = Attributes;
  readonly npcRepo = inject(NpcRepository);

  $combinedAttributeBoost = combineLatest([
      this.npcRepo.$strAttributeBoost, 
      this.npcRepo.$agiAttributeBoost,
      this.npcRepo.$conAttributeBoost,
      this.npcRepo.$intAttributeBoost,
      this.npcRepo.$spiAttributeBoost,
      this.npcRepo.$perAttributeBoost,
      this.npcRepo.$chaAttributeBoost
    ], (str: number, agi: number, con: number, int: number, spi: number, per: number, cha: number) => str+agi+con+int+spi+per+cha
  ).pipe(
    map((value) => value > 3)
  );

  $strAttributeBoostAllowed = this.npcRepo.$strAttributeBoost.pipe(map((v) => v < 2));
  $agiAttributeBoostAllowed = this.npcRepo.$agiAttributeBoost.pipe(map((v) => v < 2));
  $conAttributeBoostAllowed = this.npcRepo.$conAttributeBoost.pipe(map((v) => v < 2));
  $intAttributeBoostAllowed = this.npcRepo.$intAttributeBoost.pipe(map((v) => v < 2));
  $spiAttributeBoostAllowed = this.npcRepo.$spiAttributeBoost.pipe(map((v) => v < 2));
  $perAttributeBoostAllowed = this.npcRepo.$perAttributeBoost.pipe(map((v) => v < 2));
  $chaAttributeBoostAllowed = this.npcRepo.$chaAttributeBoost.pipe(map((v) => v < 2));
}
