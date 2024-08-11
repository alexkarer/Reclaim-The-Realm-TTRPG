import { Component, Input } from '@angular/core';
import { Perk } from '../../../../../ttrpg_resources/perks/perk';
import { requirementsToPrettyString } from '../../utils/to-pretty-string';

@Component({
  selector: 'app-perk',
  standalone: true,
  imports: [],
  templateUrl: './perk.component.html',
  styleUrl: './perk.component.scss'
})
export class PerkComponent {
  @Input() public perk?: Perk;

  public get perkRequirements(): string {
      if (this.perk?.requirements) {
        return requirementsToPrettyString(this.perk?.requirements);
      }
      return '';
  }
}
