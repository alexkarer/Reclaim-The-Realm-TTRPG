import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Spell, ALL_SPELLS } from '../../../../common_resources/player_rules/spells/spell';
import { AbilityComponent } from "../shared/components/ability/ability.component";
import { AbilityColour } from '../../../../common_resources/shared/Ability';

@Component({
    selector: 'app-spells-search',
    imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule, NgbTooltipModule, AbilityComponent],
    templateUrl: './spells-search.component.html',
    styleUrl: './spells-search.component.scss'
})
export class SpellsSearchComponent {
  filteredSpells: Spell[] = ALL_SPELLS;

  readonly SpellDifficulty = SpellDifficulty;
  readonly SpellDiscipline = SpellDiscipline;
  readonly SpellCost = SpellCost;

  selectedCastingDifficulty = SpellDifficulty.ANY;
  selectedSpellDiscipline = SpellDiscipline.ANY;
  selectedSpellCost = SpellCost.ANY;
  currentFilterText: string = "";
  readonly filterTags = [ "[REACTION]" ];
  currentFilterTags: string[] = [];
  selectedSpell: Spell = ALL_SPELLS[0];

  onSpellPowerFilterChange(spellPower: SpellDifficulty): void {
    this.selectedCastingDifficulty = spellPower;
    this.applyCurrentFilters();
  }

  onSpellDisciplineFilterChange(spellDiscipline: SpellDiscipline): void {
    this.selectedSpellDiscipline = spellDiscipline;
    this.applyCurrentFilters();
  }

  onSpellCostFilterChange(spellCost: SpellCost): void {
    this.selectedSpellCost = spellCost;
    this.applyCurrentFilters();
  }

  handleAbilityTagCheckBoxUpdate(event: Event, tag: string): void {
    let target = event.target as HTMLInputElement;
    let active = target.checked;
    if (active) {
      this.currentFilterTags.push(tag);
    } else {
      this.currentFilterTags = this.currentFilterTags.filter(t => t !== tag);
    }
    this.applyCurrentFilters();
  }

  onFreeTextFilterChange() {
    this.applyCurrentFilters();
  }

  onSelectTechnique(name: string): void {
    this.selectedSpell = ALL_SPELLS.find(e => e.name === name) ?? ALL_SPELLS[0];
  }

  getColourClass(spell: Spell): string {
    const colour = spell?.meta.colour ?? AbilityColour.COLOURLESS;
    switch (colour) {
      case AbilityColour.GREEN: return 'green';
      case AbilityColour.RED: return'red';
      case AbilityColour.BLUE: return'blue';
      case AbilityColour.YELLOW: return'yellow';
      case AbilityColour.ORANGE: return'orange';
      case AbilityColour.BROWN: return'brown'; 
      case AbilityColour.COLOURLESS: return'';
    }
  }

  private applyCurrentFilters() {
    this.filteredSpells = [...ALL_SPELLS
      .filter(m => this.filterForCastingDifficulty(m))
      .filter(m => this.filterForSpellDiscipline(m))
      .filter(m => this.filterForSpellCost(m))
      .filter(m => this.filterforFreeText(m))
      .filter(t => this.filterForTag(t))
      .filter(m => m.name.length !== 0)
    ];
  }

  private filterForCastingDifficulty(spell:  Spell): boolean {
    switch(this.selectedCastingDifficulty) {
      case SpellDifficulty.ANY: return true;
      case SpellDifficulty.SD_6: return spell.castingDifficulty === 6;
      case SpellDifficulty.SD_9: return spell.castingDifficulty === 9;
      case SpellDifficulty.SD_15: return spell.castingDifficulty === 15;
      case SpellDifficulty.SD_25: return spell.castingDifficulty === 25;
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
      case SpellCost.AP1: return spell.cost.ap === 1;
      case SpellCost.AP2: return spell.cost.ap === 2;
      case SpellCost.AP3: return spell.cost.ap === 3;
      case SpellCost.AP4: return spell.cost.ap === 4;
      case SpellCost.AP5: return spell.cost.ap === 5;
      case SpellCost.AP6: return spell.cost.ap === 6;
    }
  }

  private filterforFreeText(spell:  Spell): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return spell.name.toLocaleLowerCase().includes(text) || 
      spell.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined;
  }

  private filterForTag(spell: Spell): boolean | undefined {
    if (this.currentFilterTags.length === 0) {
      return true;
    }

    for (let tag of this.currentFilterTags) {
      if (!spell.tags.includes(tag)) {
        return false;
      }
    }
    return true;
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
  ANY = 'Any Spell Cost', AP1 = '1 [AP] Spells', AP2 = '2 [AP] Spells', AP3 = '3 [AP] Spells', AP4 = '4 [AP] Spells', AP5 = '5 [AP] Spells', AP6 = '6 [AP] Spells'
}
