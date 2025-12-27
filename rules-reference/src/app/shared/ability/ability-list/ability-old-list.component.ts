import { Component, input } from '@angular/core';
import {  AbilityOld } from '../../../../../../common_resources/shared/Ability';
import { AbilityListItemComponent } from "./ability-list-item/ability-old-list-item.component";

@Component({
    selector: 'app-ability-list',
    imports: [AbilityListItemComponent],
    templateUrl: './ability-old-list.component.html',
    styleUrl: './ability-old-list.component.scss'
})
export class AbilityListComponent {
  abilities = input<AbilityOld[]>([]);
}
