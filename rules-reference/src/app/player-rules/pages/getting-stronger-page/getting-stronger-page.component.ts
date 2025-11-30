import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-getting-stronger-page',
  imports: [PageNavigationComponent],
  templateUrl: './getting-stronger-page.component.html',
  styleUrl: './getting-stronger-page.component.scss'
})
export class GettingStrongerPageComponent {
  public readonly pageId = 'getting-stronger';
}
