import { Component, Input } from '@angular/core';
import { Equipment } from '../../../../ttrpg_resources/equipment/equipment';
import { TextElementsComponent } from "../../shared/text-utils/text-elements/text-elements.component";
import { Armour } from '../../../../ttrpg_resources/equipment/armour/armour';
import { Ammunition, Weapon, WeaponProperty } from '../../../../ttrpg_resources/equipment/weapons/weapons';
import { Shield } from '../../../../ttrpg_resources/equipment/shields/shields';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { WeaponPropertyProcessor } from "../../shared/text-utils/weapon-property-processor";

@Component({
  selector: 'app-equipment-list',
  imports: [TextElementsComponent, DynamicContentComponent, WeaponPropertyProcessor],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent {
  @Input() equipmentList: Equipment[] = [];
  public equipmentDescriptionEnabled: boolean[] = [];

  public isArmour(item: Equipment): boolean {
    return (item instanceof Armour);
  }

  public isWeapon(item: Equipment): boolean {
    return (item instanceof Weapon);
  }

  public isAmmunition(item: Equipment): boolean {
    return (item instanceof Ammunition);
  }

  public isShield(item: Equipment): boolean {
    return (item instanceof Shield);
  }

  public getWeaponProperties(item: Equipment): WeaponProperty[] {
    if (item instanceof Weapon) {
      return item.properties
    }
    console.error('Item is not a weapon: ' + item.name);
    return [];
  }

  public getDamage(item: Equipment): string {
    if (item instanceof Weapon) {
      return item.damage;
    }
    console.error('Item is not a weapon: ' + item.name);
    return '';
  }

  public getAvailibleWeapons(item: Equipment): string {
    if (item instanceof Ammunition) {
      return item.availibleWeapons;
    }
    console.error('Item is not an ammunition: ' + item.name);
    return '';
  }

  public getRecoverable(item: Equipment): string {
    if (item instanceof Ammunition) {
      return item.recoverable ? 'yes' : 'no';
    }
    console.error('Item is not an ammunition: ' + item.name);
    return '';
  }

  public getDamageBlock(item: Equipment): string {
    if (item instanceof Armour) {
      return item.damageBlock?.amount + ' ' + item.damageBlock?.type
    }
    console.error('Item is not an armour: ' + item.name);
    return '';
  }

  public getManoeuvrePeanlty(item: Equipment): string {
    if (item instanceof Armour || item instanceof Shield) {
      return item.manoeuvrePenalty === 0 ? '-' : item.manoeuvrePenalty.toString();
    }
    console.error('Item is not an armour or shield: ' + item.name);
    return '';
  }

  public getMovementPenalty(item: Equipment): string {
    if (item instanceof Armour || item instanceof Shield) {
      return item.movementPenalty === 0 ? '-' : item.movementPenalty.toString();
    }
    console.error('Item is not an armour or shield: ' + item.name);
    return '';
  }

  public getShieldBlock(item: Equipment): string {
    if (item instanceof Shield) {
      return item.shieldBlock?.toString();
    }
    console.error('Item is not a shield: ' + item.name);
    return '';
  }

  public getDamageThresholdBlock(item: Equipment): string {
    if (item instanceof Shield) {
      return item.damageThreshold?.toString();
    }
    console.error('Item is not a shield: ' + item.name);
    return '';
  }
}
