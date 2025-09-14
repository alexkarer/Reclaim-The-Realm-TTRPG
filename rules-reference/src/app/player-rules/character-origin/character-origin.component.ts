import { Component } from '@angular/core';
import { ResolveTextKeyPipe } from '../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

import originJson from '../../../../../common_resources/character/character_origin.json';

@Component({
  selector: 'app-character-origin',
  imports: [ResolveTextKeyPipe, TextProcessorPipe, DynamicContentComponent],
  templateUrl: './character-origin.component.html',
  styleUrl: './character-origin.component.scss'
})
export class CharacterOriginComponent {

  public readonly characterOrigin = originJson;
}
