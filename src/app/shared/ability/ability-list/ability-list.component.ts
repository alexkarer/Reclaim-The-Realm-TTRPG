import { Component, Input } from '@angular/core';
import { Ability } from '../../../../../ttrpg_resources/shared/Ability';
import { AbilityListItemComponent } from "./ability-list-item/ability-list-item.component";
import { RequirementsPrettierPipe } from "../../utils/to-pretty-string";

@Component({
  selector: 'app-ability-list',
  standalone: true,
  imports: [AbilityListItemComponent, RequirementsPrettierPipe],
  templateUrl: './ability-list.component.html',
  styleUrl: './ability-list.component.scss'
})
export class AbilityListComponent {
  @Input() abilities: Ability[] = [];
}
