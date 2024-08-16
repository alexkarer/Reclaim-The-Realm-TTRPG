import { Component, Input } from '@angular/core';
import { Perk } from '../../../../../ttrpg_resources/perks/perk';
import { requirementsToPrettyString } from '../../../shared/utils/to-pretty-string';
import { KeywordProcessorPipe } from "../../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../../shared/dynamic-component-rendering/dynamic-content.component";

@Component({
  selector: 'app-perk',
  standalone: true,
  imports: [KeywordProcessorPipe, DynamicContentComponent],
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
