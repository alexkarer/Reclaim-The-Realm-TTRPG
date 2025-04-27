import { Component, input, OnInit } from '@angular/core';
import { Perk } from '../../../../../common_resources/perks/perk';
import { RequirementsPrettierPipe } from "../../shared/utils/to-pretty-string";
import { TextElementsComponent } from "../../shared/text-utils/text-elements/text-elements.component";

@Component({
    selector: 'app-perk-list',
    imports: [RequirementsPrettierPipe, TextElementsComponent],
    templateUrl: './perk-list.component.html',
    styleUrl: './perk-list.component.scss'
})
export class PerkListComponent implements OnInit {
  public perkList = input<Perk[]>([]);
  public perkDescriptionEnabled: boolean[] = [];

  ngOnInit(): void {
    this.perkList().forEach(p => this.perkDescriptionEnabled.push(false));
  }
}
