import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../shared/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-transformer/text-transformer";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';

import spellsJson from '../../../../ttrpg_resources/spells/spells.json';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss'
})
export class SpellsComponent {
  public readonly spellsJson = spellsJson;
}
