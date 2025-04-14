import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import characterCreationJson from '../../../../../common_resources/character_creation/character_creation.json'
import characterOriginJson from '../../../../../common_resources/character_creation/character_origin.json'
import speciesJson from '../../../../../common_resources/character_creation/species.json'

@Component({
  selector: 'app-character-creation',
  imports: [DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './character-creation.component.html',
  styleUrl: './character-creation.component.scss'
})
export class CharacterCreationComponent {
  public readonly characterCreationJson = characterCreationJson;
  public readonly characterOriginJson = characterOriginJson;
  public readonly speciesJson = speciesJson;
}
