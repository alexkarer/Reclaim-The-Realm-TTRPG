import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { ResolveTextKeyPipe } from '../../../shared/text-utils/resolve-text-key';
import { TextProcessorPipe } from '../../../shared/text-utils/text-processor';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';

@Component({
  selector: 'app-classes-page',
  imports: [
    PageNavigationComponent,
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent
  ],
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss'
})
export class ClassesPageComponent {
  public readonly pageId = 'classes';
}
