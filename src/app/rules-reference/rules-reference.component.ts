import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment  } from '@ng-bootstrap/ng-bootstrap';
import { SkillListComponent } from './skills/skill-list.component';
import { PerkListComponent } from "./perk-list/perk-list.component";

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, SkillListComponent, PerkListComponent],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

}
