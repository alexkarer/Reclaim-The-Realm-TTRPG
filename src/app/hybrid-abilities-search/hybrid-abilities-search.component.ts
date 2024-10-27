import { Component } from '@angular/core';
import { allHybridAbilities, HybridAbility } from '../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';
import { AbilityListComponent } from '../shared/ability/ability-list/ability-list.component';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hybrid-abilities-search',
  standalone: true,
  imports: [AbilityListComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule],
  templateUrl: './hybrid-abilities-search.component.html',
  styleUrl: './hybrid-abilities-search.component.scss'
})
export class HybridAbilitiesSearchComponent {
  public filteredHybridAbilities: HybridAbility[] = allHybridAbilities;

  public readonly SpellLevel = SpellLevel;
  public readonly MartialLevel = MartiallLevel;
  public readonly HybridSpellDiscipline = HybridSpellDiscipline;
  public readonly HybridAbilityCost = HybridAbilityCost;

  public selectedSpellLevel = SpellLevel.ANY;
  public selectedMartialLevel = MartiallLevel.ANY;
  public selectedHybridSpellDiscipline = HybridSpellDiscipline.ALL;
  public selectedHybridCost = HybridAbilityCost.ANY;
  public currentFilterText: string = "";

  public onSpellLevelFilterChange(spellLevel: SpellLevel): void {
    this.selectedSpellLevel = spellLevel;
    this.applyCurrentFilters();
  }

  public onMartialLevelFilterChange(martialLevel: MartiallLevel): void {
    this.selectedMartialLevel = martialLevel;
    this.applyCurrentFilters();
  }

  public onHybridSpellDisciplineFilterChange(spellDiscipline: HybridSpellDiscipline): void {
    this.selectedHybridSpellDiscipline = spellDiscipline;
    this.applyCurrentFilters();
  }

  public onHybridCostFilterChange(spellCost: HybridAbilityCost): void {
    this.selectedHybridCost = spellCost;
    this.applyCurrentFilters();
  }

  public onFreeTextFilterChange() {
    this.applyCurrentFilters();
  }

  private applyCurrentFilters() {
    this.filteredHybridAbilities = [...allHybridAbilities
      .filter(m => this.filterForSpellLevel(m))
      .filter(m => this.filterForMartialLevel(m))
      .filter(m => this.filterForHybridSpellDiscipline(m))
      .filter(m => this.filterForHybridCost(m))
      .filter(m => this.filterforFreeText(m))
      .filter(m => m.name.length !== 0)
    ];
  }

  private filterForSpellLevel(spell:  HybridAbility): boolean {
    switch(this.selectedSpellLevel) {
      case SpellLevel.ANY: return true;
      case SpellLevel.THREE: return spell.requirements.requiredLevels.find(req => req.levelType === '[SPELL LEVEL]' && req.amount >= 3) !== undefined;
      case SpellLevel.SIX: return spell.requirements.requiredLevels.find(req => req.levelType === '[SPELL LEVEL]' && req.amount >= 3) !== undefined;
      case SpellLevel.NINE: return spell.requirements.requiredLevels.find(req => req.levelType === '[SPELL LEVEL]' && req.amount >= 3) !== undefined;
    }
  }

  private filterForMartialLevel(spell:  HybridAbility): boolean {
    switch(this.selectedMartialLevel) {
      case MartiallLevel.ANY: return true;
      case MartiallLevel.THREE: return spell.requirements.requiredLevels.find(req => req.levelType === '[MARTIAL LEVEL]' && req.amount >= 3) !== undefined;
      case MartiallLevel.SIX: return spell.requirements.requiredLevels.find(req => req.levelType === '[MARTIAL LEVEL]' && req.amount >= 3) !== undefined;
      case MartiallLevel.NINE: return spell.requirements.requiredLevels.find(req => req.levelType === '[MARTIAL LEVEL]' && req.amount >= 3) !== undefined;
    }
  }

  private filterForHybridSpellDiscipline(spell: HybridAbility): boolean {
    switch (this.selectedHybridSpellDiscipline) {
      case HybridSpellDiscipline.ALL: return true;
      case HybridSpellDiscipline.ELEMENTAL: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('elemental')) !== undefined;
      case HybridSpellDiscipline.PYROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('pyromancy')) !== undefined;
      case HybridSpellDiscipline.HYDROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('hydromancy')) !== undefined;
      case HybridSpellDiscipline.AEROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('aeromancy')) !== undefined;
      case HybridSpellDiscipline.GEOMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('geomancy')) !== undefined;
      case HybridSpellDiscipline.COSMIC: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('cosmic')) !== undefined;
      case HybridSpellDiscipline.LIGHT: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('light')) !== undefined;
      case HybridSpellDiscipline.RESTORATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('restoration')) !== undefined;
      case HybridSpellDiscipline.SHADOW: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('shadow')) !== undefined;
      case HybridSpellDiscipline.NECROMANCY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('necromancy')) !== undefined;
      case HybridSpellDiscipline.DIVINATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('divination')) !== undefined;
      case HybridSpellDiscipline.MANIPULATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('manipulation')) !== undefined;
      case HybridSpellDiscipline.TELEKINESIS: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('telekinesis')) !== undefined;
      case HybridSpellDiscipline.TRANSMUTATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('transmutation')) !== undefined;
      case HybridSpellDiscipline.CONJURATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('conjuration')) !== undefined;
      case HybridSpellDiscipline.ILLUSION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('illusion')) !== undefined;
      case HybridSpellDiscipline.TELEPORTATION: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('teleporation')) !== undefined;
      case HybridSpellDiscipline.TELEPATHY: return spell.tags.find(tag => tag.toLocaleLowerCase().includes('telepathy')) !== undefined;
    }
  }

  private filterForHybridCost(spell: HybridAbility): boolean {
    switch (this.selectedHybridCost) {
      case HybridAbilityCost.ANY: return true;
      case HybridAbilityCost.REACTION: return spell.cost.includes('[REACTION]')
      case HybridAbilityCost.AP1: return spell.cost.includes('1 [AP]')
      case HybridAbilityCost.AP2: return spell.cost.includes('2 [AP]')
      case HybridAbilityCost.AP3: return spell.cost.includes('3 [AP]')
      case HybridAbilityCost.AP4: return spell.cost.includes('4 [AP]')
      case HybridAbilityCost.AP5: return spell.cost.includes('5 [AP]')
      case HybridAbilityCost.AP6: return spell.cost.includes('6 [AP]')
    }
  }

  private filterforFreeText(spell: HybridAbility): boolean | undefined {
    if (this.currentFilterText === null) {
      return true;
    }
    let text = this.currentFilterText.toLocaleLowerCase();
    return spell.name.toLocaleLowerCase().includes(text) || 
      spell.tags.find(tag => tag.toLocaleLowerCase().includes(text)) !== undefined ||
      spell.description.toLocaleLowerCase().includes(text);
  }
}

enum SpellLevel {
  ANY = 'Any [SPELL LEVEL]', THREE = '[SPELL LEVEL] >= 3', SIX = '[SPELL LEVEL] >= 6', NINE = '[SPELL LEVEL] >= 9'
}

enum MartiallLevel {
  ANY = 'Any [MARTIAL LEVEL]', THREE = '[MARTIAL LEVEL] >= 3', SIX = '[MARTIAL LEVEL] >= 6', NINE = '[MARTIAL LEVEL] >= 9'
}

enum HybridSpellDiscipline {
  ALL = 'All Hybrid Abilities',
  ELEMENTAL = 'Elemental Hybrid Abilities',
  PYROMANCY = 'Elemental(Pyromancy) Hybrid Abilities',
  HYDROMANCY = 'Elemental(Hydromancy) Hybrid Abilities',
  AEROMANCY = 'Elemental(Aeromancy) Hybrid Abilities',
  GEOMANCY = 'Elemental(Geomancy) Hybrid Abilities',
  COSMIC = 'Cosmic Hybrid Abilities',
  LIGHT = 'Cosmic(Light) Hybrid Abilities',
  RESTORATION = 'Cosmic(Restoration) Hybrid Abilities',
  SHADOW = 'Cosmic(Shadow) Hybrid Abilities',
  NECROMANCY = 'Cosmic(Necromancy) Hybrid Abilities',
  DIVINATION = 'Cosmic(Divination) Hybrid Abilities',
  MANIPULATION = 'Manipulation Hybrid Abilities',
  TELEKINESIS = 'Manipulation(Telekinesis) Hybrid Abilities',
  TRANSMUTATION = 'Manipulation(Transmutation) Hybrid Abilities',
  CONJURATION = 'Manipulation(Conjuration) Hybrid Abilities',
  ILLUSION = 'Manipulation(Illusion) Hybrid Abilities',
  TELEPORTATION = 'Manipulation(Teleportation) Hybrid Abilities',
  TELEPATHY = 'Manipulation(Telepathy) Hybrid Abilities'
}

enum HybridAbilityCost {
  ANY = 'Any Hybrid Ability Cost', REACTION = '[REACTION] Hybrid Abilities', AP1 = '1 [AP] Hybrid Abilities', AP2 = '2 [AP] Hybrid Abilities', AP3 = '3 [AP] Hybrid Abilities', AP4 = '4 [AP] Hybrid Abilities', AP5 = '5 [AP] Hybrid Abilities', AP6 = '6 [AP] Hybrid Abilities'
}
