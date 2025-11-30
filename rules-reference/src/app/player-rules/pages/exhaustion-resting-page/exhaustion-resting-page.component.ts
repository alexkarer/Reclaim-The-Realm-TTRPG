import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-exhaustion-resting-page',
  imports: [PageNavigationComponent],
  templateUrl: './exhaustion-resting-page.component.html',
  styleUrl: './exhaustion-resting-page.component.scss'
})
export class ExhaustionRestingPageComponent {
  public readonly pageId = 'exhaustion-resting';
}
