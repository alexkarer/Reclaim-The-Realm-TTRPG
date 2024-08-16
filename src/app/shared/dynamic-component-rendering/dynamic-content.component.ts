import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { KeywordComponent } from '../keyword/keyword.component';
import { ContentPart } from '../text-transformer/text-transformer';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [CommonModule, KeywordComponent],
  templateUrl: './dynamic-content.component.html',
  styleUrl: './dynamic-content.component.scss'
})
export class DynamicContentComponent {
  @Input() content: ContentPart[] = [];
}
