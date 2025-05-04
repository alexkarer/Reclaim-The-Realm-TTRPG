import { Component, input } from '@angular/core';
import { PlayerClass } from '../../../../../common_resources/classes/classes';
import commonClassTexts from '../../../../../common_resources/classes/common_class_texts.json';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import { AbilityListComponent } from "../../shared/ability/ability-list/ability-list.component";
import { TextElementsComponent } from "../../shared/text-utils/text-elements/text-elements.component";

@Component({
    selector: 'app-class',
    imports: [DynamicContentComponent, KeywordProcessorPipe, AbilityListComponent, TextElementsComponent],
    templateUrl: './class.component.html',
    styleUrl: './class.component.scss'
})
export class ClassComponent {

  playerClass = input<PlayerClass>();
  public readonly commonClassTexts = commonClassTexts;
}
