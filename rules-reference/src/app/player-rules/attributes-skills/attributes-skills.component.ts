import { Component } from '@angular/core';
import { ResolveTextKeyPipe } from '../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

import attributesJson from "../../../../../common_resources/player_rules/character/attributes.json";

@Component({
  selector: 'app-attributes-skills',
  imports: [ResolveTextKeyPipe, TextProcessorPipe, DynamicContentComponent],
  templateUrl: './attributes-skills.component.html',
  styleUrl: './attributes-skills.component.scss'
})
export class AttributesSkillsComponent {

  public readonly attributes = attributesJson;

}
