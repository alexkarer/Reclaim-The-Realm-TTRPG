import { Component, input } from '@angular/core';
import { TextElement } from '../../../../../../common_resources/shared/TextElements';
import { DynamicContentComponent } from "../dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../keyword-processor";
import { AbilityListItemComponent } from "../../ability/ability-list/ability-list-item/ability-list-item.component";

@Component({
    selector: 'app-text-elements',
    imports: [DynamicContentComponent, KeywordProcessorPipe, AbilityListItemComponent],
    templateUrl: './text-elements.component.html',
    styleUrl: './text-elements.component.scss'
})
export class TextElementsComponent {
  textElements = input<TextElement[]>();
  useBoldTextForHeader = input(false);
}
