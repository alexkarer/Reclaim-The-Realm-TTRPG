import { Component } from '@angular/core';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EQUIPMENT, Equipment } from '../../../../common_resources/player_rules/equipment/equipment';
import { EquipmentComponent } from "./equipment/equipment.component";

@Component({
    selector: 'app-equipment-search',
    imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, FormsModule, NgbTooltipModule, EquipmentComponent],
    templateUrl: './equipment-search.component.html',
    styleUrl: './equipment-search.component.scss'
})
export class EquipmentSearchComponent {

    filteredEquipment: Equipment[] = EQUIPMENT;
    currentFilterText = '';
    readonly filterTags = [ 'Weapon', 'Armour' ];
    currentFilterTags: string[] = [];
    selectedEquipment: Equipment = EQUIPMENT[0];

    onEquipmentTagCheckboxToggle(event: Event, tag: string): void {
        let target = event.target as HTMLInputElement;
        let active = target.checked;
        if (active) {
            this.currentFilterTags.push(tag);
        } else {
            this.currentFilterTags = this.currentFilterTags.filter(t => t !== tag);
        }
        this.applyCurrentFilters();
    }

    onFreeTextFilterChange(): void {
        this.applyCurrentFilters();
    }

    onSelectEquipment(name: string): void {
        this.selectedEquipment = EQUIPMENT.find(e => e.name === name) ?? EQUIPMENT[0];
    }

    private applyCurrentFilters() {
        this.filteredEquipment = EQUIPMENT
            .filter(e => this.filterForEquipmentTag(e))
            .filter(e => this.filterforFreeText(e))
            .filter(e => e.name.length !== 0);
    }

    private filterForEquipmentTag(equipment: Equipment): boolean {
        if (this.currentFilterTags.length === 0) {
            return true;
        }
        for (let tag of this.currentFilterTags) {
            if (!equipment.tags.includes(tag)) {
                return false;
            }
        }
        return true;
    }

    private filterforFreeText(equipment: Equipment): boolean | undefined {
        if (this.currentFilterText === null) {
            return true;
        }
        let text = this.currentFilterText.toLocaleLowerCase();
        return equipment.name.toLocaleLowerCase().includes(text) ||
            equipment.tags.includes(text) ||
            equipment.description?.filter(d =>
                d.regularText?.toLocaleLowerCase().includes(text) ||
                d.headerLine?.toLocaleLowerCase().includes(text) ||
                (
                    d.bulletPoints !== null &&
                    d.bulletPoints.filter(bp => bp.toLocaleLowerCase().includes(text)).length >= 0
                )
            )?.length > 0;
    }
}
