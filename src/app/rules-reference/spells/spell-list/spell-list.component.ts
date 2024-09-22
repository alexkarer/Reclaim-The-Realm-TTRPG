import { Component, Input, OnInit } from '@angular/core';
import { Spell, SpellCollection } from '../../../../../ttrpg_resources/spells/spells';
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-list.component";

@Component({
  selector: 'app-spell-list',
  standalone: true,
  imports: [AbilityListComponent],
  templateUrl: './spell-list.component.html',
  styleUrl: './spell-list.component.scss'
})
export class SpellListComponent implements OnInit {

  @Input() spellCollection?: SpellCollection;

  public elementalSpells: Spell[] = [];
  public cosmicSpells: Spell[] = [];
  public manipulationSpells: Spell[] = [];

  ngOnInit(): void {
    if (this.spellCollection?.elementalSpells) {
      this.elementalSpells = this.spellCollection.elementalSpells;
    }
    if (this.spellCollection?.cosmicSpells) {
      this.cosmicSpells = this.spellCollection.cosmicSpells;
    }
    if (this.spellCollection?.manipulationSpells) {
      this.manipulationSpells = this.spellCollection.manipulationSpells;
    }
  }
}
