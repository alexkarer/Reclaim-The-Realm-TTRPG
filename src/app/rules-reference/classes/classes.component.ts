import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../shared/text-utils/keyword-processor';
import { playerClasses } from '../../../../ttrpg_resources/classes/classes';
import commonClassTexts from '../../../../ttrpg_resources/classes/common_class_texts.json';
import { ClassComponent } from "./class/class.component";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, ClassComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {

  public readonly classDescriptions = commonClassTexts;
  public readonly classes = playerClasses;

}
