import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { craftingPerks, Perk, defensivePerks, martialPerks, otherPerks, skillPerks, spellcastingPerks } from '../../../../ttrpg_resources/perks/perk';
import { PerkComponent } from "./perk/perk.component";

@Component({
  selector: 'app-perk-list',
  standalone: true,
  imports: [NgbScrollSpyFragment, PerkComponent],
  templateUrl: './perk-list.component.html',
  styleUrl: './perk-list.component.scss'
})
export class PerkListComponent {
  public craftingPerks: Perk[] =  craftingPerks;
  public defensivePerks: Perk[] =  defensivePerks;
  public martialPerks: Perk[] =  martialPerks;
  public otherPerks: Perk[] =  otherPerks;
  public skillPerks: Perk[] =  skillPerks;
  public spellcastingPerks: Perk[] =  spellcastingPerks;
}
