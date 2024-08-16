import { Component, Input } from '@angular/core';
import { Skill } from '../../../../../../ttrpg_resources/skills/skill';
import { KeywordProcessorPipe } from "../../../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../../../shared/dynamic-component-rendering/dynamic-content.component";

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [KeywordProcessorPipe, DynamicContentComponent],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {

  @Input() public skill?: Skill;
}
