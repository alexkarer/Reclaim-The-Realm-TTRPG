import { Component, Input } from '@angular/core';
import { NgbScrollSpyItem, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-keyword',
  standalone: true,
  imports: [NgbTooltipModule, NgbScrollSpyItem],
  templateUrl: './keyword.component.html',
  styleUrl: './keyword.component.scss'
})
export class KeywordComponent {
  @Input() public keyword?: string
  @Input() public toolTip?: string
  @Input() public link?: string
}
