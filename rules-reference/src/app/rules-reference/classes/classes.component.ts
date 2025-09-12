import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import commonClassTexts from '../../../../../common_resources/classes/common_class_texts.json';

@Component({
    selector: 'app-classes',
    imports: [DynamicContentComponent, TextProcessorPipe],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  public readonly classDescriptions = commonClassTexts;

}
