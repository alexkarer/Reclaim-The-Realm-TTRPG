import { Component } from '@angular/core';
import { SkillListComponent } from "./skill-list/skill-list.component";
import { AttributesListComponent } from "./attributes-list/attributes-list.component";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [SkillListComponent, AttributesListComponent, NgbScrollSpyFragment],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss'
})
export class CharacterOverviewComponent {

}
