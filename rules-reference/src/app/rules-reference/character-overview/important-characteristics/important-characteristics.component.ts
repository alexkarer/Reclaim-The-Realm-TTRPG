import { Component } from '@angular/core';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import coreValuesJson from "../../../../../../common_resources/character_values/core_values.json";
import resourcesJson from "../../../../../../common_resources/character_values/resources.json";
import defensesJson from "../../../../../../common_resources/character_values/defenses.json";
import otherValuesJson from "../../../../../../common_resources/character_values/other_values.json";

@Component({
    selector: 'app-important-characteristics',
    imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
    templateUrl: './important-characteristics.component.html',
    styleUrl: './important-characteristics.component.scss'
})
export class ImportantCharacteristicsComponent {
  public readonly levelDescription: string = coreValuesJson.levelDescription;
  public readonly martialLevelDescription: string = coreValuesJson.martialLevelDescription;
  public readonly spellLevelDescription: string = coreValuesJson.spellLevelDescription;
  public readonly xpDescription: string = coreValuesJson.xpDescription;
  public readonly apDescription: string = coreValuesJson.apDescription;
  public readonly mpDescription: string = coreValuesJson.mpDescription;
  public readonly martialdamageInfo = coreValuesJson.martialDamage;

  public readonly hpDescription: string = resourcesJson.hpDescription;
  public readonly droppingTo0HPDescription: string = resourcesJson.droppingTo0HPDescription;
  public readonly tempHPDescription: string = resourcesJson.tempHPDescription;
  public readonly staminaDescription: string = resourcesJson.staminaDescription;
  public readonly arcanaDescription: string = resourcesJson.arcanaDescription;

  public readonly defensesDescription: string = defensesJson.defensesDescription;
  public readonly thresholdDescription: string = defensesJson.thresholdDescription;
  public readonly saveBonusDescription: string = defensesJson.saveDescription;
  public readonly stabilityDescription: string = defensesJson.stabilityDescription;
  public readonly dodgeDescription: string = defensesJson.dodgeDescription;
  public readonly toughnessDescription: string = defensesJson.toughnessDescription;
  public readonly willpowerDescription: string = defensesJson.willpowerDescription;
  public readonly damageResistanceDescription: string = defensesJson.damageResistanceDescription;

  public readonly alginmentJson = otherValuesJson.alignment;
  public readonly specialMovementDescription: string = otherValuesJson.specialMovementDescription;
  public readonly specialMovementTypes = otherValuesJson.specialMovementTypes;
  public readonly sizeDescription: string = otherValuesJson.sizeDescription;
  public readonly sizes = otherValuesJson.sizeValues;
}