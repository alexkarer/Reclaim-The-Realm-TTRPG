import { Component } from '@angular/core';
import { Equipment } from '../../../../common_resources/equipment/equipment';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { armours } from '../../../../common_resources/equipment/armour/armour';
import { EquipmentListComponent } from "./equipment-list/equipment-list.component";
import { weapons, ammunitions } from '../../../../common_resources/equipment/weapons/weapons';
import { shields } from '../../../../common_resources/equipment/shields/shields';
import { otherItems } from '../../../../common_resources/equipment/other_items/other_items';

@Component({
    selector: 'app-equipment-search',
    imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, FormsModule, EquipmentListComponent],
    templateUrl: './equipment-search.component.html',
    styleUrl: './equipment-search.component.scss'
})
export class EquipmentSearchComponent {

    public readonly allEquipment: Equipment[] = [
        ...weapons,
        ...ammunitions,
        ...armours,
        ...shields,
        ...otherItems
    ];
    public filteredEquipment: Equipment[] = this.allEquipment;

    public readonly EquipmentType = EquipmentType;

    public slectedEquipmentType = EquipmentType.ALL;
    public currentFilterText = "";

    public onEquipmenTypeFilterChange(equipmentType: EquipmentType): void {
        this.slectedEquipmentType = equipmentType;
        this.applyCurrentFilters();
    }

    public onFreeTextFilterChange(): void {
        this.applyCurrentFilters();
    }

    private applyCurrentFilters() {
        this.filteredEquipment = [...this.allEquipment
            .filter(e => this.filterForEquipmentType(e))
            .filter(e => this.filterforFreeText(e))
            .filter(e => e.name.length !== 0)
        ];
    }

    private filterForEquipmentType(equipment: Equipment): boolean {
        switch (this.slectedEquipmentType) {
            case EquipmentType.ALL: return true;
            case EquipmentType.WEAPON: return equipment.type.toLocaleLowerCase().includes('weapon');
            case EquipmentType.AMMUNATION: return equipment.type.toLocaleLowerCase().includes('ammunition');
            case EquipmentType.ARMOUR: return equipment.type.toLocaleLowerCase().includes('armour');
            case EquipmentType.SHIELDS: return equipment.type.toLocaleLowerCase().includes('shield');
            case EquipmentType.WEARABLES: return equipment.type.toLocaleLowerCase().includes('wearable');
            case EquipmentType.CONSUMBABLES: return equipment.type.toLocaleLowerCase().includes('consumable');
            case EquipmentType.TOOLS_AND_GADGETS: return equipment.type.toLocaleLowerCase().includes('tool');
            case EquipmentType.SURVIVAL: return equipment.type.toLocaleLowerCase().includes('survival');
        }
    }

    private filterforFreeText(equipment: Equipment): boolean | undefined {
        if (this.currentFilterText === null) {
            return true;
        }
        let text = this.currentFilterText.toLocaleLowerCase();
        return equipment.name.toLocaleLowerCase().includes(text) ||
            equipment.description?.filter(d =>
                d.regularText?.toLocaleLowerCase().includes(text) ||
                d.headerLine?.toLocaleLowerCase().includes(text) ||
                (
                    d.bulletPoints !== null &&
                    d.bulletPoints.filter(bp => bp.toLocaleLowerCase().includes(text)).length >= 0
                ) ||
                d.ability?.name.toLocaleLowerCase().includes(text) ||
                d.ability?.description.find(desc => desc.regularText?.toLocaleLowerCase().includes(text)) !== undefined
            )?.length > 0;
    }
}

enum EquipmentType {
    ALL = "All Equipment",
    WEAPON = "Weapons",
    AMMUNATION = "Ammunitions",
    ARMOUR = "Armour",
    SHIELDS = "Shields",
    WEARABLES = "Wearables",
    CONSUMBABLES = "Consumables",
    TOOLS_AND_GADGETS = "Tools and Gadgets",
    SURVIVAL = "Survival"
}