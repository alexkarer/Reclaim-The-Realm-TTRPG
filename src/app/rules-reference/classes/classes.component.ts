import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../shared/text-utils/keyword-processor';
import commonClassTexts from '../../../../ttrpg_resources/classes/common_class_texts.json';

@Component({
    selector: 'app-classes',
    imports: [DynamicContentComponent, KeywordProcessorPipe],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  public readonly classDescriptions = commonClassTexts;

}
