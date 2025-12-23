import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RulesReferenceTableOfContentsSidebarComponent } from '../shared/table-of-contents-sidebar/table-of-contents-sidebar.component';

@Component({
  selector: 'app-rules-layout',
  imports: [RouterOutlet, RulesReferenceTableOfContentsSidebarComponent],
  templateUrl: './rules-layout.component.html',
  styleUrl: './rules-layout.component.scss'
})
export class RulesLayoutComponent {
  sidebarVisible = true;

  constructor(private offcanvasService: NgbOffcanvas) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openMobileSidebar(content: any) {
    this.offcanvasService.open(content, { position: 'start', scroll: true });
  }
}
