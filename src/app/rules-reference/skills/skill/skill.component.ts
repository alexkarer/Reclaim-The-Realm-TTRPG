import { Component, Input } from '@angular/core';
import { Skill } from '../../../../../ttrpg_resources/skills/skill';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {

  @Input() public skill?: Skill;
}
