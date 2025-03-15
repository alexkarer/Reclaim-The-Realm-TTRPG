import { Component } from '@angular/core';
import characterCreationJson from '../../../../ttrpg_resources/character_creation/character_creation.json'
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";

@Component({
  selector: 'app-character-creation',
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './character-creation.component.html',
  styleUrl: './character-creation.component.scss'
})
export class CharacterCreationComponent {
  public readonly characterCreationJson = characterCreationJson;
}
