import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, TemplateRef } from '@angular/core';
import { NgbScrollSpy, NgbScrollSpyMenu, NgbScrollSpyItem, NgbScrollSpyFragment, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RulesOverviewComponent } from './rules-overview/rules-overview.component';

@Component({
    selector: 'app-rules-reference',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        NgbScrollSpy,
        NgbScrollSpyMenu,
        NgbScrollSpyItem,
        NgbScrollSpyFragment,
        RulesOverviewComponent
    ],
    templateUrl: './rules-reference.component.html',
    styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {

    private offcanvasService = inject(NgbOffcanvas);

    openTableOfContents(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { scroll: true });
    }
}
