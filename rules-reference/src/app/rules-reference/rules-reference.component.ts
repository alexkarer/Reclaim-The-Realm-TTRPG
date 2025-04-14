import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, TemplateRef } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, NgbOffcanvas  } from '@ng-bootstrap/ng-bootstrap';
import { CharacterOverviewComponent } from "./character-overview/character-overview.component";
import { RulesOverviewComponent } from './rules-overview/rules-overview.component';
import { EquipmentComponent } from "./equipment/equipment.component";
import { AdventuringComponent } from "./adventuring/adventuring.component";
import { CombatComponent } from "./combat/combat.component";
import { ToolboxComponent } from "./toolbox/toolbox.component";
import { ClassesComponent } from './classes/classes.component';
import { AbilitiesComponent } from "./abilities/abilities.component";
import { CharacterCreationComponent } from './character-creation/character-creation.component';

@Component({
    selector: 'app-rules-reference',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        NgbScrollSpy,
        NgbScrollSpyMenu,
        NgbScrollSpyItem,
        NgbScrollSpyFragment,
        CharacterCreationComponent,
        CharacterOverviewComponent,
        RulesOverviewComponent,
        EquipmentComponent,
        AdventuringComponent,
        CombatComponent,
        ToolboxComponent,
        ClassesComponent,
        AbilitiesComponent
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
