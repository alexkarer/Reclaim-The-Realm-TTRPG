import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { SkillComponent } from './skill/skill.component';
import { regularSkills, loreSkills, toolSkills, Skill } from '../../../../ttrpg_resources/skills/skill';
import { halveArray } from '../../shared/utils/array-utils';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [NgbScrollSpyFragment, SkillComponent],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {
  
  public regularSkillsLeft: Skill[] = halveArray(regularSkills)[0];
  public regularSkillsRight: Skill[] = halveArray(regularSkills)[1];

  public loreSkillsLeft: Skill[] = halveArray(loreSkills)[0];
  public loreSkillsRight: Skill[] = halveArray(loreSkills)[1];

  public toolSkillsLeft: Skill[] = halveArray(toolSkills)[0];
  public toolSkillsRight: Skill[] = halveArray(toolSkills)[1];
}
