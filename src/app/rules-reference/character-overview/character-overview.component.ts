import { Component } from '@angular/core';
import { SkillListComponent } from "./skill-list/skill-list.component";
import { AttributesListComponent } from "./attributes-list/attributes-list.component";
import { NgbScrollSpyFragment, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import attributeTexts from '../../../../ttrpg_resources/character_values/attributes/attribute-texts.json';
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [SkillListComponent, AttributesListComponent, NgbScrollSpyFragment, NgbTooltipModule, KeywordProcessorPipe, DynamicContentComponent],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss'
})
export class CharacterOverviewComponent {
  public attributeDescription = attributeTexts.attributeDescription;
  public attributeTestDescription = attributeTexts.attributeTestDescription;
}
