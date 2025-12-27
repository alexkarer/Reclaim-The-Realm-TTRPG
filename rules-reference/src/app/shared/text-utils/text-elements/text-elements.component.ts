import { Component, input } from '@angular/core';
import { TextElement } from '../../../../../../common_resources/shared/TextElements';
import { DynamicContentComponent } from "../dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../text-processor";
import { AbilityListItemComponent } from "../../ability/ability-list/ability-list-item/ability-old-list-item.component";

@Component({
    selector: 'app-text-elements',
    imports: [DynamicContentComponent, TextProcessorPipe, AbilityListItemComponent],
    templateUrl: './text-elements.component.html',
    styleUrl: './text-elements.component.scss'
})
export class TextElementsComponent {
  textElements = input<TextElement[]>();
  useBoldTextForHeader = input(false);
}
