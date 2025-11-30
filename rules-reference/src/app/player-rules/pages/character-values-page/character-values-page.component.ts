import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { CharacterValuesComponent } from '../../character-values/character-values.component';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

@Component({
  selector: 'app-character-values-page',
  imports: [
    PageNavigationComponent,
    CharacterValuesComponent,
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent
  ],
  templateUrl: './character-values-page.component.html',
  styleUrl: './character-values-page.component.scss'
})
export class CharacterValuesPageComponent {
  public readonly pageId = 'character-values';
}
