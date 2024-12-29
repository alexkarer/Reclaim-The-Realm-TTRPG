import { Component, Input } from '@angular/core';
import { TextElement } from '../../../../../ttrpg_resources/shared/TextElements';
import { DynamicContentComponent } from "../dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../keyword-processor";
import { AbilityListItemComponent } from "../../ability/ability-list/ability-list-item/ability-list-item.component";

@Component({
  selector: 'app-text-elements',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, AbilityListItemComponent],
  templateUrl: './text-elements.component.html',
  styleUrl: './text-elements.component.scss'
})
export class TextElementsComponent {
  @Input() textElements?: TextElement[] = [];
  @Input() useBoldTextForHeader = false;
}
