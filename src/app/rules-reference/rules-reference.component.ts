import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment  } from '@ng-bootstrap/ng-bootstrap';
import { SkillListComponent } from './skills/skill-list.component';

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, SkillListComponent],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

}
