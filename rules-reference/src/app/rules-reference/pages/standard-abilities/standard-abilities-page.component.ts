import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { AbilityComponent } from "../../../shared/components/ability/ability.component";
import { STANDARD_ABILITIES } from "../../../../../../common_resources/core_rules/combat/standard_abilities";

@Component({
  selector: 'app-standard-abilities-page',
  imports: [RulesReferencePageNavigationComponent, AbilityComponent],
  templateUrl: './standard-abilities-page.component.html',
  styleUrl: './standard-abilities-page.component.scss'
})
export class StandardAbilitiesPageComponent {
  public readonly pageId = 'standard-abilities';
  
  readonly movementAbilities = STANDARD_ABILITIES.filter(a => a.tags.includes('Move'));
  readonly otherAbilities = STANDARD_ABILITIES.filter(a => !a.tags.includes('Move'));
}
