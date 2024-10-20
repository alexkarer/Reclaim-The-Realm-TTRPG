import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, TemplateRef } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, NgbOffcanvas  } from '@ng-bootstrap/ng-bootstrap';
import { PerksComponent } from "./perks/perks.component";
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
import { ClassesComponent } from './classes/classes.component';

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment,
    SkillListComponent, PerksComponent, CharacterOverviewComponent, RulesOverviewComponent,
    MartialManeuversComponent,
    SpellsComponent,
    HybridAbilitiesComponent,
    EquipmentComponent,
    AdventuringComponent,
    CombatComponent,
    ToolboxComponent,
    ClassesComponent
],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

  private offcanvasService = inject(NgbOffcanvas);
  
  openTableOfContents(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { scroll: true });
	}
}
