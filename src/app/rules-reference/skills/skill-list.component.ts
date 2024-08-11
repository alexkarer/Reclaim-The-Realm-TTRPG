import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { SkillComponent } from './skill/skill.component';
import { regularSkills, loreSkills, toolSkills, Skill } from '../../../../ttrpg_resources/skills/skill';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [NgbScrollSpyFragment, SkillComponent],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
  
  public regularSkills: Skill[] = regularSkills;
  public loreSkills: Skill[] = loreSkills;
  public toolSkills: Skill[] = toolSkills;
}
