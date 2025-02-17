import { Component, Input } from '@angular/core';
import { Skill } from '../../../../../ttrpg_resources/skills/skill';

@Component({
    selector: 'app-skill-list',
    imports: [],
    templateUrl: './skill-list.component.html',
    styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {

  @Input() public skills?: Skill[];
}
