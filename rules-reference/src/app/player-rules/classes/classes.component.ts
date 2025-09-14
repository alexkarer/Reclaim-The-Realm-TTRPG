import { Component } from '@angular/core';
import { ResolveTextKeyPipe } from '../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

@Component({
  selector: 'app-classes',
  imports: [ResolveTextKeyPipe, TextProcessorPipe, DynamicContentComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {

}
