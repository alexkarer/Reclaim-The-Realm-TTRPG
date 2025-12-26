import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-standard-abilities-page',
  imports: [RulesReferencePageNavigationComponent],
  templateUrl: './standard-abilities-page.component.html',
  styleUrl: './standard-abilities-page.component.scss'
})
export class StandardAbilitiesPageComponent {
  public readonly pageId = 'standard-abilities';
}
