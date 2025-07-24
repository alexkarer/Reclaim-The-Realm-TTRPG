import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { KeywordComponent } from '../keyword/keyword.component';
import { ContentPart } from '../text-utils';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dynamic-content',
    imports: [CommonModule, KeywordComponent, NgbTooltipModule],
    templateUrl: './dynamic-content.component.html',
    styleUrl: './dynamic-content.component.scss'
})
export class DynamicContentComponent {
  content = input<ContentPart[]>([]);

  getTagTooltipText(tags: string | undefined): string {
    if (!tags) {
      console.error('Error text for tag content should not be Empty');
      return 'ERROR';
    }
    
    const tagList = tags.split(' ');
    if (tagList.length === 1) {
      return `Any Ability that contains the ${tagList[0]} Tag.`;
    } else {
      const lastElement = tagList[tagList.length-1];
      const prettyTagList = tagList.splice(0, tagList.length-1).join(', ') + ' and ' + lastElement;
      return `Any Ability that contains all of the following Tags: ${prettyTagList}.`;
    }
  }
}
