import { Component } from '@angular/core';
import { PlayerClass, playerClasses } from '../../../ttrpg_resources/classes/classes';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { ClassComponent } from './class/class.component';

@Component({
  selector: 'app-classes-overview',
  standalone: true,
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, ClassComponent],
  templateUrl: './classes-overview.component.html',
  styleUrl: './classes-overview.component.scss'
})
export class ClassesOverviewComponent {
  public readonly ClassNames = ClassNames;
  public selectedClass: ClassNames = ClassNames.BARBARIAN;

  public getCurrentlySelectedClass(): PlayerClass {
    let clazz = playerClasses.find(clazz => clazz.className === this.selectedClass);
    if (clazz) {
      return clazz;
    } else {
      return playerClasses[0];
    }
  }
}

enum ClassNames {
  BARBARIAN = 'Barbarian', PRIEST = 'Priest', FIGHTER = 'Fighter', ROGUE = 'Rogue', MAGE = 'Mage', WARLOCK = 'Warlock'
}