import { Component, Input, OnInit } from '@angular/core';
import { PlayerClass } from '../../../../../ttrpg_resources/classes/classes';
import commonClassTexts from '../../../../../ttrpg_resources/classes/common_class_texts.json';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";
import { AbilityListComponent } from "../../../shared/ability/ability-list/ability-list.component";
import { TextElementsComponent } from "../../../shared/text-utils/text-elements/text-elements.component";

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [DynamicContentComponent, KeywordProcessorPipe, AbilityListComponent, TextElementsComponent],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent implements OnInit {

  @Input() public playerClass?: PlayerClass;
  public readonly commonClassTexts = commonClassTexts;
  public classFeaturesPerLevel?: [string]

  ngOnInit(): void {
    let levelOneFeatures = '<span class="fw-bold">' + this.playerClass?.classCoreFeature.name + '</span>' + 
        ', ' + 
        this.playerClass?.classFeatures
          .filter(feature => feature.levels.includes(1))
          .map(feature => this.mapFeatureName(feature))
          .join(', ');

    this.classFeaturesPerLevel = [levelOneFeatures];

    for (let i = 2; i <= 12; i++) {
      var featuresAtCurrentLevel = this.playerClass?.classFeatures
          .filter(feature => feature.levels.includes(i))
          .map(feature => this.mapFeatureName(feature))
          .join(', ');

      if (featuresAtCurrentLevel != undefined) {
        this.classFeaturesPerLevel.push(featuresAtCurrentLevel)
      } else {
        this.classFeaturesPerLevel.push('-')
      }
    }
  }

  mapFeatureName(feature: { name: string; relatedClassPath: null | string }): string {
    if (feature.relatedClassPath != null) {
      return '<span class="fst-italic">' + feature.name + '</span>'
    } else {
      return feature.name;
    }
  }
}
