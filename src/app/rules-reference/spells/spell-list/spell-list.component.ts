import { Component, Input, OnInit } from '@angular/core';
import { Spell, SpellCollection } from '../../../../../ttrpg_resources/spells/spells';
import { halveArray } from '../../../shared/utils/array-utils';
import { AbilityComponent } from "../../../shared/ability/ability.component";

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [AbilityComponent],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.scss'
})
export class SpellListComponent implements OnInit {

  @Input() spellCollection?: SpellCollection;

  public elementalSpellsLeft: Spell[] = [];
  public elementalSpellsRight: Spell[] = [];

  public cosmicSpellsLeft: Spell[] = [];
  public cosmicSpellsRight: Spell[] = [];

  public manipulationSpellsLeft: Spell[] = [];
  public manipulationSpellsRight: Spell[] = [];

  ngOnInit(): void {
    this.elementalSpellsLeft = halveArray(this.spellCollection?.elementalSpells)[0];
    this.elementalSpellsRight = halveArray(this.spellCollection?.elementalSpells)[1];

    this.cosmicSpellsLeft = halveArray(this.spellCollection?.cosmicSpells)[0];
    this.cosmicSpellsRight = halveArray(this.spellCollection?.cosmicSpells)[1];

    this.manipulationSpellsLeft = halveArray(this.spellCollection?.manipulationSpells)[0];
    this.manipulationSpellsRight = halveArray(this.spellCollection?.manipulationSpells)[1];
  }
}
