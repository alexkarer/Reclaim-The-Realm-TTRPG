import { Component, input } from '@angular/core';
import { NgbScrollSpyItem, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-keyword',
    imports: [NgbTooltipModule, NgbScrollSpyItem],
    templateUrl: './keyword.component.html',
    styleUrl: './keyword.component.scss'
})
export class KeywordComponent {
  keyword = input<string>();
  toolTip = input<string>();
  link = input<string>('');
}
