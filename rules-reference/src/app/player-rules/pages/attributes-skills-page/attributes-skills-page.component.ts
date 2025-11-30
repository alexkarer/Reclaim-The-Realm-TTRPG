import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

import attributesJson from '../../../../../../common_resources/player_rules/character/attributes.json';
import skillsJson from '../../../../../../common_resources/player_rules/character/skills.json';

@Component({
  selector: 'app-attributes-skills-page',
  imports: [
    PageNavigationComponent,
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent
  ],
  templateUrl: './attributes-skills-page.component.html',
  styleUrl: './attributes-skills-page.component.scss'
})
export class AttributesSkillsPageComponent {
  public readonly pageId = 'attributes-skills';
  public readonly attributes = attributesJson;
  public readonly skills = skillsJson;
}
