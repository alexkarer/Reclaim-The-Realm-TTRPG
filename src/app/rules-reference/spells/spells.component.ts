import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { SpellListComponent } from "./spell-list/spell-list.component";

import spellsJson from '../../../../ttrpg_resources/spells/spells.json';
import { fifthPowerSpells, firstPowerSpells, fourthPowerSpells, secondPowerSpells, sixthPowerSpells, thirdPowerSpells } from '../../../../ttrpg_resources/spells/spells';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment, SpellListComponent],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  public readonly spellsJson = spellsJson;

  public readonly firstPowerSpells = firstPowerSpells;
  public readonly secondPowerSpells = secondPowerSpells;
  public readonly thirdPowerSpells = thirdPowerSpells;
  public readonly fourthPowerSpells = fourthPowerSpells;
  public readonly fifthPowerSpells = fifthPowerSpells;
  public readonly sixthPowerSpells = sixthPowerSpells;
}
