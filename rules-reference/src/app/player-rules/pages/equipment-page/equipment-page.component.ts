import { Component } from '@angular/core';
import { PlayerRulesPageNavigationComponent } from '../../shared/page-navigation/player-rules-page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";
import equipmentRulesJson from "../../../../../../common_resources/player_rules/equipment/equipment_rules.json"
import { halveArray } from '../../../shared/utils/array-utils';
import { FormatWeightPipe } from "../../../shared/pipes/format-weight";

@Component({
  selector: 'app-equipment-page',
  imports: [PlayerRulesPageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe, FormatWeightPipe],
  templateUrl: './equipment-page.component.html',
  styleUrl: './equipment-page.component.scss'
})
export class EquipmentPageComponent {
  public readonly pageId = 'equipment';
  public readonly equipmentRules = equipmentRulesJson;

  public readonly carryingCapacityTable1 = halveArray(equipmentRulesJson.carryingCapacityTable)[0];
  public readonly carryingCapacityTable2 = halveArray(equipmentRulesJson.carryingCapacityTable)[1];
}
