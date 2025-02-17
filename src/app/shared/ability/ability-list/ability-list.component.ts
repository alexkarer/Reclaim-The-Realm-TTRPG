import { Component, Input } from '@angular/core';
import { Ability } from '../../../../../ttrpg_resources/shared/Ability';
import { AbilityListItemComponent } from "./ability-list-item/ability-list-item.component";

@Component({
    selector: 'app-ability-list',
    imports: [AbilityListItemComponent],
    templateUrl: './ability-list.component.html',
    styleUrl: './ability-list.component.scss'
})
export class AbilityListComponent {
  @Input() abilities: Ability[] = [];
}
