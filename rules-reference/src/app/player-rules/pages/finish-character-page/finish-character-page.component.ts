import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';

@Component({
  selector: 'app-finish-character-page',
  imports: [PlayerRulesPageNavigationComponent],
  templateUrl: './finish-character-page.component.html',
  styleUrl: './finish-character-page.component.scss'
})
export class FinishCharacterPageComponent {
  public readonly pageId = 'finish-character';
}
