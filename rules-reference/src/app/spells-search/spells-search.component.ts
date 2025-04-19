import { Component } from '@angular/core';
import { AbilityListComponent } from '../shared/ability/ability-list/ability-list.component';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { allSpells, Spell } from '../../../../common_resources/spells/spells';

@Component({
    selector: 'app-spells-search',
    imports: [AbilityListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule],
    templateUrl: './spells-search.component.html',
    styleUrl: './spells-search.component.scss'
})
export class SpellsSearchComponent {
  public filteredSpells: Spell[] = allSpells;

  public readonly SpellDifficulty = SpellDifficulty;
  public readonly SpellDiscipline = SpellDiscipline;
  public readonly SpellCost = SpellCost;

  public selectedSpellPower = SpellDifficulty.ANY;
  public selectedSpellDiscipline = SpellDiscipline.ANY;
  public selectedSpellCost = SpellCost.ANY;
  public currentFilterText: string = "";

  public onSpellPowerFilterChange(spellPower: SpellDifficulty): void {
    this.selectedSpellPower = spellPower;
    this.applyCurrentFilters();
  }

  public onSpellDisciplineFilterChange(spellDiscipline: SpellDiscipline): void {
    this.selectedSpellDiscipline = spellDiscipline;
    this.applyCurrentFilters();
  }

  public onSpellCostFilterChange(spellCost: SpellCost): void {
    this.selectedSpellCost = spellCost;
    this.applyCurrentFilters();
  }

  public onFreeTextFilterChange() {
    this.applyCurrentFilters();
  }

  private applyCurrentFilters() {
    this.filteredSpells = [...allSpells
      .filter(m => this.filterForSpellPower(m))
      .filter(m => this.filterForSpellDiscipline(m))
      .filter(m => this.filterForSpellCost(m))
      .filter(m => this.filterforFreeText(m))
      .filter(m => m.name.length !== 0)
    ];
  }

  private filterForSpellPower(spell:  Spell): boolean {
    switch(this.selectedSpellPower) {
      case SpellDifficulty.ANY: return true;
      case SpellDifficulty.SD_6: return spell.spellDifficulty === 6;
      case SpellDifficulty.SD_9: return spell.spellDifficulty === 9;
      case SpellDifficulty.SD_15: return spell.spellDifficulty === 15;
      case SpellDifficulty.SD_25: return spell.spellDifficulty === 25;
    }
  }

  private filterForSpellDiscipline(spell:  Spell): boolean {
    switch (this.selectedSpellDiscipline) {
      case SpellDiscipline.ANY: return true;
      case SpellDiscipline.ELEMENTAL: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('elemental')) !== undefined;
      case SpellDiscipline.PYROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('pyromancy')) !== undefined;
      case SpellDiscipline.HYDROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('hydromancy')) !== undefined;
      case SpellDiscipline.AEROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('aeromancy')) !== undefined;
      case SpellDiscipline.GEOMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('geomancy')) !== undefined;
      case SpellDiscipline.COSMIC: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('cosmic')) !== undefined;
      case SpellDiscipline.LIGHT: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('light')) !== undefined;
      case SpellDiscipline.RESTORATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('restoration')) !== undefined;
      case SpellDiscipline.SHADOW: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('shadow')) !== undefined;
      case SpellDiscipline.NECROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('necromancy')) !== undefined;
      case SpellDiscipline.DIVINATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('divination')) !== undefined;
      case SpellDiscipline.MANIPULATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('manipulation')) !== undefined;
      case SpellDiscipline.TELEKINESIS: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('telekinesis')) !== undefined;
      case SpellDiscipline.TRANSMUTATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('transmutation')) !== undefined;
      case SpellDiscipline.CONJURATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('conjuration')) !== undefined;
      case SpellDiscipline.ILLUSION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('illusion')) !== undefined;
      case SpellDiscipline.TELEPORTATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('teleporation')) !== undefined;
      case SpellDiscipline.TELEPATHY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('telepathy')) !== undefined;
    }
  }

  private filterForSpellCost(spell:  Spell): boolean {
    switch (this.selectedSpellCost) {
      case SpellCost.ANY: return true;
      case SpellCost.REACTION: return spell.cost.includes('[REACTION]')
      case SpellCost.AP1: return spell.cost.includes('1 [AP]')
      case SpellCost.AP2: return spell.cost.includes('2 [AP]')
      case SpellCost.AP3: return spell.cost.includes('3 [AP]')
      case SpellCost.AP4: return spell.cost.includes('4 [AP]')
      case SpellCost.AP5: return spell.cost.includes('5 [AP]')
      case SpellCost.AP6: return spell.cost.includes('6 [AP]')
    }
  }

  private filterforFreeText(spell:  Spell): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return spell.name.toLocaleLowerCase().includes(text) || 
      spell.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined ||
      spell.description.toLocaleLowerCase().includes(text) ||
      spell.upCastingTheSpell?.toLowerCase().includes(text);
  }
}

enum SpellDifficulty {
  ANY = 'Any Spell Difficulty',
  SD_6 = 'Spell Difficulty 6',
  SD_9 = 'Spell Difficulty 9',
  SD_15 = 'Spell Difficulty 15',
  SD_25 = 'Spell Difficulty 25',
}

enum SpellDiscipline {
  ANY = 'Any Spell Discipline',
  ELEMENTAL = 'Elemental Spells',
  PYROMANCY = 'Elemental(Pyromancy) Spells',
  HYDROMANCY = 'Elemental(Hydromancy) Spells',
  AEROMANCY = 'Elemental(Aeromancy) Spells',
  GEOMANCY = 'Elemental(Geomancy) Spells',
  COSMIC = 'Cosmic Spells',
  LIGHT = 'Cosmic(Light) Spells',
  RESTORATION = 'Cosmic(Restoration) Spells',
  SHADOW = 'Cosmic(Shadow) Spells',
  NECROMANCY = 'Cosmic(Necromancy) Spells',
  DIVINATION = 'Cosmic(Divination) Spells',
  MANIPULATION = 'Manipulation Spells',
  TELEKINESIS = 'Manipulation(Telekinesis) Spells',
  TRANSMUTATION = 'Manipulation(Transmutation) Spells',
  CONJURATION = 'Manipulation(Conjuration) Spells',
  ILLUSION = 'Manipulation(Illusion) Spells',
  TELEPORTATION = 'Manipulation(Teleportation) Spells',
  TELEPATHY = 'Manipulation(Telepathy) Spells'
}

enum SpellCost {
  ANY = 'Any Spell Cost', REACTION = '[REACTION] Spells', AP1 = '1 [AP] Spells', AP2 = '2 [AP] Spells', AP3 = '3 [AP] Spells', AP4 = '4 [AP] Spells', AP5 = '5 [AP] Spells', AP6 = '6 [AP] Spells'
}
