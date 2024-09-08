import { Component, Input } from '@angular/core';
import { DynamicContentComponent } from '../dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../text-transformer/text-transformer';
import { Ability } from '../../../../ttrpg_resources/globals/Ability';
import { RequirementsPrettierPipe } from "../utils/to-pretty-string";
import { MartialManeuver } from '../../../../ttrpg_resources/martial_maneuvers/martial-maneuvers';
import { Spell } from '../../../../ttrpg_resources/spells/spells';
import { HybridAbility } from '../../../../ttrpg_resources/hybrid_abilities/hybrid_abilities';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, RequirementsPrettierPipe],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.scss'
})
export class AbilityComponent {

  @Input() public ability?: Ability;

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

  public isSpellAndHasAtHigherSpellPower(): boolean {
    if (this.ability instanceof Spell) {
      return this.ability.atHigherSpellPower ? true : false
    } else {
      return false;
    }
  }

  public getAtHigherSpellPower(): string {
    let spell = this.ability as Spell;
    return spell.atHigherSpellPower ?? '';
  }

  public isHybridAbility(): boolean {
    return (this.ability instanceof HybridAbility)
  }
}
