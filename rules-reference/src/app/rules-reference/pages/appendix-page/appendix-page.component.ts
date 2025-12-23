import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-appendix-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './appendix-page.component.html',
  styleUrl: './appendix-page.component.scss'
})
export class AppendixPageComponent {
  public readonly pageId = 'appendix';
}
