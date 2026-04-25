import { Component, input } from '@angular/core';
import { Armour, Currency, DamageBlock, Equipment, EquipmentColour } from '../../../../../common_resources/player_rules/equipment/equipment';
import { TextElementsWithoutAbilityComponent } from "../../shared/text-utils/text-elements-without-ability/text-elements-without-ability.component";
import { Ability } from '../../../../../common_resources/shared/ability';
import { EQUIPMENT_ABILITIES } from '../../../../../common_resources/player_rules/equipment/equipment_abilities/equipment_abilities';
import { AbilityComponent } from "../../shared/components/ability/ability.component";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap/tooltip';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../shared/text-utils/text-processor";

@Component({
  selector: 'app-equipment',
  imports: [TextElementsWithoutAbilityComponent, AbilityComponent, NgbTooltipModule, DynamicContentComponent, TextProcessorPipe],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss',
})
export class EquipmentComponent {
  equipment = input<Equipment>();
  Currency = Currency;

  get colourClass(): string {
    const colour = this.equipment()?.meta.colour ?? EquipmentColour.COLOURLESS;
    switch (colour) {
      case EquipmentColour.COLOURLESS: return 'equipment-colourless';
    }
  }

  get grantedAbilities(): Ability[] {
    return EQUIPMENT_ABILITIES.filter(a => this.equipment()?.grantedAbilities.includes(a.name));
  }

  get isArmour(): boolean {
    return (this.equipment() instanceof Armour);
  }

  get getDamageBlock(): string {
    let e = this.equipment();
    if (e instanceof Armour) {
      return e.armourStats.damageBlock.map(dmgBlock => `${dmgBlock.amount} ${dmgBlock.type}`).join(', ');
    }
    return '';
  }

  get dodgePenalty(): number {
    let e = this.equipment();
    if (e instanceof Armour) {
      return e.armourStats.dodgePenalty;
    }
    return 0;
  }

  get mpPenalty(): number {
    let e = this.equipment();
    if (e instanceof Armour) {
      return e.armourStats.mpPenalty;
    }
    return 0;
  }
}
