import { Component } from '@angular/core';
import { PageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';

@Component({
  selector: 'app-finish-character-page',
  imports: [PageNavigationComponent],
  templateUrl: './finish-character-page.component.html',
  styleUrl: './finish-character-page.component.scss'
})
export class FinishCharacterPageComponent {
  public readonly pageId = 'finish-character';
}
