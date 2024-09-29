import { Component } from '@angular/core';
import { SkillListComponent } from "./skill-list/skill-list.component";
import { AttributesListComponent } from "./attributes-list/attributes-list.component";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ImportantCharacteristicsComponent } from "./important-characteristics/important-characteristics.component";
import { ProgressionComponent } from "./progression/progression.component";
import { regularSkills, loreSkills, toolSkills } from '../../../../ttrpg_resources/skills/skill';
import attributeTexts from '../../../../ttrpg_resources/character_values/attributes/attribute-texts.json';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [SkillListComponent, AttributesListComponent, NgbScrollSpyFragment, KeywordProcessorPipe, DynamicContentComponent, ImportantCharacteristicsComponent, ProgressionComponent],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss'
})
export class CharacterOverviewComponent {
  public readonly attributeDescription = attributeTexts.attributeDescription;
  public readonly attributeTestDescription = attributeTexts.attributeTestDescription;

  public readonly regularSkills = regularSkills;
  public readonly loreSkills = loreSkills;
  public readonly toolSkills = toolSkills;
}
