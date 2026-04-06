import { Component, effect, forwardRef, input } from '@angular/core';
import { Ability, AbilityColour } from '../../../../../../common_resources/shared/Ability';
import { RequirementsPrettierPipe } from '../../pipes/to-pretty-string';
import { DynamicContentComponent } from '../../text-utils/dynamic-component-rendering/dynamic-content.component';
import { TextProcessorPipe } from '../../text-utils/text-processor';
import { TextElementsWithoutAbilityComponent } from '../../text-utils/text-elements-without-ability/text-elements-without-ability.component';
import { Technique } from '../../../../../../common_resources/player_rules/techniques/technique';
import { AbilityActionComponent } from "./ability-action/ability-action.component";
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Spell } from '../../../../../../common_resources/player_rules/spells/spell';
import { StmtModifier } from '@angular/compiler';

@Component({
  selector: 'app-ability',
  imports: [RequirementsPrettierPipe, forwardRef(() => DynamicContentComponent), TextProcessorPipe, TextElementsWithoutAbilityComponent, AbilityActionComponent, NgbCollapse],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.scss',
})
export class AbilityComponent {
  ability = input<Ability>();
  collapsable = input<boolean>(false);
  isCollapsed = true;

  get colourClass(): string {
    const colour = this.ability()?.meta.colour ?? AbilityColour.COLOURLESS;
    switch (colour) {
      case AbilityColour.GREEN: return 'ability-green';
      case AbilityColour.RED: return'ability-red';
      case AbilityColour.BLUE: return'ability-blue';
      case AbilityColour.YELLOW: return'ability-yellow';
      case AbilityColour.ORANGE: return'ability-orange';
      case AbilityColour.BROWN: return'ability-brown'; 
      case AbilityColour.WHITE: return'ability-white'; 
      case AbilityColour.COLOURLESS: return'ability-colourless';
      case AbilityColour.REDGREEN: return 'ability-redgreen';
      case AbilityColour.BLUEWHITE: return 'ability-bluewhite';
    }
  }

  get abilityCost(): string {
    const cost = this.ability()?.cost;
    if (!cost) {
      console.error('undefined cost for ability', this.ability());
      return 'No Ability Cost Defined';
    }
    let costText = [];
    if ((cost.ap > 0 || (cost.ap === 0, cost.mp === 0))) {
      costText.push(`${cost.ap} [AP]`);
    } if (cost.mp > 0) {
      costText.push(`${cost.mp} [MP]`);
    } if (cost.mana > 0) {
      costText.push(`${cost.mana} [MANA]`);
    } if (cost.stamina > 0) {
      costText.push(`${cost.stamina} [STAMINA]`);
    } if (cost.other && cost.other.trim() !== '') {
      costText.push(cost.other);
    } if (costText.length === 0) {
      console.error('undefined cost for ability', this.ability());
      return 'No Ability Cost Defined';
    }
    return costText.join(' ');
  }

  get isTechniqueAndHasPush(): boolean {
    let ability = this.ability();
    if (ability instanceof Technique) {
      return ability.push !== null;
    } else {
      return false;
    }
  }

  get pushingCost(): string {
    let ability = this.ability();
    if (ability instanceof Technique) {
      return ability.push?.cost ?? '';
    }
    return '';
  }

  get pushingEffect(): string {
    let ability = this.ability();
    if (ability instanceof Technique) {
      return ability.push?.effect ?? '';
    }
    return '';
  }

  get isSpell(): boolean {
    let ability = this.ability();
    if (ability instanceof Spell) {
      return true;
    } else {
      return false;
    }
  }

  get castingDifficulty(): number {
    let ability = this.ability();
    if (ability instanceof Spell) {
      return ability.castingDifficulty;
    } else {
      return 0;
    }
  }

  get spellComponents() {
    let ability = this.ability();
    if (ability instanceof Spell) {
      return ability.components;
    } else {
      return {verbal: '', somatic: '', material: ''};
    }
  }

  get spellUpcast() {
    let ability = this.ability();
    if (ability instanceof Spell) {
      return ability.upcast;
    } else {
      return {mana: 0, effect: ''};
    }
  }
}
