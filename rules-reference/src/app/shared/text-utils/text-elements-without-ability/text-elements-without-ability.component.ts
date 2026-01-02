import { Component, input, forwardRef } from '@angular/core';
import { DynamicContentComponent } from "../dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../text-processor";
import { TextElementWithoutAbility } from '../../../../../../common_resources/shared/TextElements';

@Component({
  selector: 'app-text-elements-without-ability',
  imports: [forwardRef(() => DynamicContentComponent), TextProcessorPipe],
  templateUrl: './text-elements-without-ability.component.html',
  styleUrl: './text-elements-without-ability.component.scss'
})
export class TextElementsWithoutAbilityComponent {
    textElements = input<TextElementWithoutAbility[]>();
    useBoldTextForHeader = input(false);
}
