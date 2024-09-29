import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { craftingPerks, Perk, defensivePerks, martialPerks, otherPerks, skillPerks, spellcastingPerks } from '../../../../ttrpg_resources/perks/perk';
import { PerkListComponent } from "./perk-list/perk-list.component";

@Component({
  selector: 'app-perks',
  standalone: true,
  imports: [NgbScrollSpyFragment, PerkListComponent],
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss'
})
export class PerksComponent {
  public readonly craftingPerks = craftingPerks;
  public readonly defensivePerks = defensivePerks;
  public readonly martialPerks = martialPerks;
  public readonly skillPerks = skillPerks;
  public readonly spellcastingPerks = spellcastingPerks;
  public readonly otherPerks = otherPerks;
}
