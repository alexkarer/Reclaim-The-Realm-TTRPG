import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-useful-tables-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './useful-tables-page.component.html',
  styleUrl: './useful-tables-page.component.scss'
})
export class UsefulTablesPageComponent {
  public readonly pageId = 'useful-tables';
}
