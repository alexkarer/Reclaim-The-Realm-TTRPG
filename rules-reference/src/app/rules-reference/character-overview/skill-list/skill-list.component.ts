import { Component, input } from '@angular/core';
import { Skill } from '../../../../../../common_resources/skills/skill';

@Component({
    selector: 'app-skill-list',
    imports: [],
    templateUrl: './skill-list.component.html',
    styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {

  public skills = input<Skill[]>([]);
}
