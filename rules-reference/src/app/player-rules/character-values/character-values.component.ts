import { Component } from '@angular/core';
import { ResolveTextKeyPipe } from '../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

@Component({
  selector: 'app-character-values',
  imports: [ResolveTextKeyPipe, TextProcessorPipe, DynamicContentComponent],
  templateUrl: './character-values.component.html',
  styleUrl: './character-values.component.scss'
})
export class CharacterValuesComponent {

}
