import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TableOfContentsSidebarComponent } from '../shared/table-of-contents-sidebar/table-of-contents-sidebar.component';

@Component({
  selector: 'app-player-rules-layout',
  imports: [RouterOutlet, TableOfContentsSidebarComponent],
  templateUrl: './player-rules-layout.component.html',
  styleUrl: './player-rules-layout.component.scss'
})
export class PlayerRulesLayoutComponent {
  sidebarVisible = true;

  constructor(private offcanvasService: NgbOffcanvas) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  openMobileSidebar(content: any) {
    this.offcanvasService.open(content, { position: 'start', scroll: true });
  }
}
