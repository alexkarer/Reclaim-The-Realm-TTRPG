import { Component, inject, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbOffcanvas, NgbScrollSpy, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player-rules',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgbScrollSpy,
    NgbScrollSpyMenu,
    NgbScrollSpyItem,
    NgbScrollSpyFragment,
  ],
  templateUrl: './player-rules.component.html',
  styleUrl: './player-rules.component.scss'
})
export class PlayerRulesComponent {

  private offcanvasService = inject(NgbOffcanvas);

  openTableOfContents(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }
}
