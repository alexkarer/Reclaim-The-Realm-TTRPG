import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

import martialDamageJson from '../../../../../../common_resources/player_rules/character/martial_damage.json';
import specialMovementJson from '../../../../../../common_resources/player_rules/character/special_movement.json';
import sizesJson from '../../../../../../common_resources/player_rules/character/sizes.json';
import alignmentJson from '../../../../../../common_resources/player_rules/character/alignment.json';

@Component({
  selector: 'app-character-values-page',
  imports: [
    PageNavigationComponent,
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent
  ],
  templateUrl: './character-values-page.component.html',
  styleUrl: './character-values-page.component.scss'
})
export class CharacterValuesPageComponent {
  public readonly pageId = 'character-values';
  public readonly martialDamageTable = martialDamageJson;
  public readonly specialMovementTypes = specialMovementJson;
  public readonly sizes = sizesJson;
  public readonly alignment = alignmentJson;
}
