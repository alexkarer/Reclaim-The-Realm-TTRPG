import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { AbilityComponent } from "../../../shared/components/ability/ability.component";
import { STANDARD_ABILITIES } from "../../../../../../common_resources/core_rules/combat/standard_abilities";

@Component({
  selector: 'app-abilities-page',
  imports: [RulesReferencePageNavigationComponent, AbilityComponent],
  templateUrl: './abilities-page.component.html',
  styleUrl: './abilities-page.component.scss'
})
export class AbilitiesPageComponent {
  public readonly pageId = 'abilities';
  
  readonly otherAbilities = STANDARD_ABILITIES.filter(a => !a.tags.includes('Move'));
}
