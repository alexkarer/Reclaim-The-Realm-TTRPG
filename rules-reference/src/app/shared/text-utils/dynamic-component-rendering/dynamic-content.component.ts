import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { KeywordComponent } from '../keyword/keyword.component';
import { ContentPart } from '../text-utils';

@Component({
    selector: 'app-dynamic-content',
    imports: [CommonModule, KeywordComponent],
    templateUrl: './dynamic-content.component.html',
    styleUrl: './dynamic-content.component.scss'
})
export class DynamicContentComponent {
  content = input<ContentPart[]>([]);
}
