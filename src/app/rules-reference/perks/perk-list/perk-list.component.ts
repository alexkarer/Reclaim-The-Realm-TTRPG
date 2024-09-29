import { Component, Input, OnInit } from '@angular/core';
import { Perk } from '../../../../../ttrpg_resources/perks/perk';
import { RequirementsPrettierPipe } from "../../../shared/utils/to-pretty-string";
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";

@Component({
  selector: 'app-perk-list',
  standalone: true,
  imports: [RequirementsPrettierPipe, DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './perk-list.component.html',
  styleUrl: './perk-list.component.scss'
})
export class PerkListComponent implements OnInit {
  @Input() public perkList?: Perk[];
  public perkDescriptionEnabled: boolean[] = [];

  ngOnInit(): void {
    this.perkList?.forEach(p => this.perkDescriptionEnabled.push(false));
  }
}
