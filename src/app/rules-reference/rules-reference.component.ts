import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment  } from '@ng-bootstrap/ng-bootstrap';
import { PerkListComponent } from "./perk-list/perk-list.component";
import { SkillListComponent } from './character-overview/skill-list/skill-list.component';
import { CharacterOverviewComponent } from "./character-overview/character-overview.component";
import { RulesOverviewComponent } from './rules-overview/rules-overview.component';

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, 
    SkillListComponent, PerkListComponent, CharacterOverviewComponent, RulesOverviewComponent
  ],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

}
