import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { craftingPerks, Perk, defensivePerks, martialPerks, otherPerks, skillPerks, spellcastingPerks } from '../../../../ttrpg_resources/perks/perk';
import { PerkComponent } from "./perk/perk.component";
import { halveArray } from '../utils/array-utils';

@Component({
  selector: 'app-perk-list',
  standalone: true,
  imports: [NgbScrollSpyFragment, PerkComponent],
  templateUrl: './perk-list.component.html',
  styleUrl: './perk-list.component.scss'
})
export class PerkListComponent {
  public craftingPerksLeft: Perk[] = halveArray(craftingPerks)[0];
  public craftingPerksRight: Perk[] = halveArray(craftingPerks)[1];
  
  public defensivePerksLeft: Perk[] = halveArray(defensivePerks)[0];
  public defensivePerksRight: Perk[] = halveArray(defensivePerks)[1];

  public martialPerksLeft: Perk[] = halveArray(martialPerks)[0];
  public martialPerksRight: Perk[] = halveArray(martialPerks)[1];

  public skillPerksLeft: Perk[] = halveArray(skillPerks)[0];
  public skillPerksRight: Perk[] = halveArray(skillPerks)[1];

  public spellcastingLeft: Perk[] = halveArray(spellcastingPerks)[0];
  public spellcastingRight: Perk[] = halveArray(spellcastingPerks)[1];

  public otherPerksLeft: Perk[] = halveArray(otherPerks)[0];
  public otherPerksRight: Perk[] = halveArray(otherPerks)[1];
}
