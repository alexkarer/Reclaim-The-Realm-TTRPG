import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment  } from '@ng-bootstrap/ng-bootstrap';
import { PerkListComponent } from "./perk-list/perk-list.component";
import { SkillListComponent } from './character-overview/skill-list/skill-list.component';
import { CharacterOverviewComponent } from "./character-overview/character-overview.component";
import { RulesOverviewComponent } from './rules-overview/rules-overview.component';
import { MartialManeuversComponent } from "./martial-maneuvers/martial-maneuvers.component";
import { SpellsComponent } from "./spells/spells.component";
import { HybridAbilitiesComponent } from "./hybrid-abilities/hybrid-abilities.component";
import { EquipmentComponent } from "./equipment/equipment.component";
import { AdventuringComponent } from "./adventuring/adventuring.component";
import { CombatComponent } from "./combat/combat.component";
import { ToolboxComponent } from "./toolbox/toolbox.component";

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment,
    SkillListComponent, PerkListComponent, CharacterOverviewComponent, RulesOverviewComponent,
    MartialManeuversComponent,
    SpellsComponent,
    HybridAbilitiesComponent,
    EquipmentComponent,
    AdventuringComponent,
    CombatComponent,
    ToolboxComponent
],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

}
