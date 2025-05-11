import { Component, input } from '@angular/core';
import { Ability } from '../../../../../../../common_resources/shared/Ability';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RequirementsPrettierPipe } from "../../../utils/to-pretty-string";
import { MartialManeuver } from '../../../../../../../common_resources/martial_maneuvers/martial-maneuvers';
import { Spell } from '../../../../../../../common_resources/spells/spells';
import { HybridAbility } from '../../../../../../../common_resources/hybrid_abilities/hybrid_abilities';
import { DynamicContentComponent } from "../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../text-utils/keyword-processor";
import { TextElementsWithoutAbilityComponent } from "../../../text-utils/text-elements-without-ability/text-elements-without-ability.component";

@Component({
    selector: 'app-ability-list-item',
    imports: [NgbCollapse, RequirementsPrettierPipe, DynamicContentComponent, KeywordProcessorPipe, TextElementsWithoutAbilityComponent],
    templateUrl: './ability-list-item.component.html',
    styleUrl: './ability-list-item.component.scss'
})
export class AbilityListItemComponent {
  ability = input<Ability>();
  public isCollapsed = true;

  public getAbilityName(): string | undefined {
    if (this.isSpell()) {
      let spell = this.ability() as Spell;
      return this.ability()?.name + ' (' + spell.spellDifficulty + ')';
    } else {
      return this.ability()?.name;
    }
  }

  public isMartialManeuver(): boolean {
    return (this.ability() instanceof MartialManeuver);
  }

  public isMartialManeuverAndHasPush(): boolean {
    let ability = this.ability();
    if (ability instanceof MartialManeuver) {
      return ability.maneuverPush ? true : false
    } else {
      return false;
    }
  }

  public getPushingExtraCost(): string {
    let martialManeuver = this.ability() as MartialManeuver;
    return martialManeuver.maneuverPush?.pushingExtraCost ?? '';
  }

  public getPushingDescription(): string {
    let martialManeuver = this.ability() as MartialManeuver;
    return martialManeuver.maneuverPush?.pushingDescription ?? '';
  }

  public isSpell(): boolean {
    return (this.ability() instanceof Spell)
  }

  public getSpellComponents(): string {
    let spell = this.ability() as Spell;
    return spell.components ?? '-';
  }

  public getUpcastingTheSpell(): string {
    let spell = this.ability() as Spell;
    return spell.upCastingTheSpell ?? '';
  }

  public getSpellDifficulty(): number {
    let spell = this.ability() as Spell;
    return spell.spellDifficulty ?? -1;
  }

  public isHybridAbility(): boolean {
    return (this.ability() instanceof HybridAbility)
  }
}
