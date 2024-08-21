import { Component, Input } from '@angular/core';
import { Perk } from '../../../../../ttrpg_resources/perks/perk';
import { KeywordProcessorPipe } from "../../../shared/text-transformer/text-transformer";
import { DynamicContentComponent } from "../../../shared/dynamic-component-rendering/dynamic-content.component";
import { RequirementsPrettierPipe } from "../../../shared/utils/to-pretty-string";

@Component({
  selector: 'app-perk',
  standalone: true,
  imports: [KeywordProcessorPipe, DynamicContentComponent, RequirementsPrettierPipe],
  templateUrl: './perk.component.html',
  styleUrl: './perk.component.scss'
})
export class PerkComponent {
  @Input() public perk?: Perk;
}
