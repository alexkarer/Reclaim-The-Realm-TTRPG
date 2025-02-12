import { Component, Input } from '@angular/core';
import { Ability } from '../../../../../../ttrpg_resources/shared/Ability';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RequirementsPrettierPipe } from "../../../utils/to-pretty-string";
import { MartialManeuver } from '../../../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { Spell } from '../../../../../../ttrpg_resources/spells/spells';
import { HybridAbility } from '../../../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';
import { DynamicContentComponent } from "../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../text-utils/keyword-processor";

@Component({
  selector: 'app-ability-list-item',
  standalone: true,
  imports: [NgbCollapse, RequirementsPrettierPipe, DynamicContentComponent, KeywordProcessorPipe],
  templateUrl: './ability-list-item.component.html',
  styleUrl: './ability-list-item.component.scss'
})
export class AbilityListItemComponent {
  @Input() public ability?: Ability;
  public isCollapsed = true;

  public isMartialManeuver(): boolean {
    return (this.ability instanceof MartialManeuver);
  }

  public isMartialManeuverAndHasPush(): boolean {
    if (this.ability instanceof MartialManeuver) {
      return this.ability.maneuverPush ? true : false
    } else {
      return false;
    }
  }

  public getPushingExtraCost(): string {
    let martialManeuver = this.ability as MartialManeuver;
    return martialManeuver.maneuverPush?.pushingExtraCost ?? '';
  }

  public getPushingDescription(): string {
    let martialManeuver = this.ability as MartialManeuver;
    return martialManeuver.maneuverPush?.pushingDescription ?? '';
  }

  public isSpell(): boolean {
    return (this.ability instanceof Spell)
  }

  public getSpellComponents(): string {
    let spell = this.ability as Spell;
    return spell.components ?? '-';
  }

  public isSpellAndHasUpcastingTheSpell(): boolean {
    if (this.ability instanceof Spell) {
      return this.ability.upCastingTheSpell ? true : false
    } else {
      return false;
    }
  }

  public getUpcastingTheSpell(): string {
    let spell = this.ability as Spell;
    return spell.upCastingTheSpell ?? '';
  }

  public getSpellDifficulty(): number {
    let spell = this.ability as Spell;
    return spell.spellDifficulty ?? -1;
  }

  public isHybridAbility(): boolean {
    return (this.ability instanceof HybridAbility)
  }
}
