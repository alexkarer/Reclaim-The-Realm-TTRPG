import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { PlayerClass } from '../../../../ttrpg_resources/classes/classes';
import commonClassTexts from '../../../../ttrpg_resources/classes/common_class_texts.json';
import { DynamicContentComponent } from "../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { KeywordProcessorPipe } from "../../shared/text-utils/keyword-processor";
import { AbilityListComponent } from "../../shared/ability/ability-list/ability-list.component";
import { TextElementsComponent } from "../../shared/text-utils/text-elements/text-elements.component";

@Component({
    selector: 'app-class',
    imports: [DynamicContentComponent, KeywordProcessorPipe, AbilityListComponent, TextElementsComponent],
    templateUrl: './class.component.html',
    styleUrl: './class.component.scss'
})
export class ClassComponent {

  private _playerClass?: PlayerClass;
  @Input() set playerClass(value: PlayerClass) {
    this._playerClass = value;
    this.setClassInformation();
  }

  public get playerClass(): PlayerClass | undefined {
    return this._playerClass;
  }

  private _classPath: string = 'All Classpaths';
  @Input() set classPath(value: string) {
    this._classPath = value;
    this.setClassInformation();
  }

  public readonly commonClassTexts = commonClassTexts;
  public classFeaturesPerLevel?: [string]

  public getClassFeatures() {
    return this._playerClass?.classFeatures.filter(feature => this.isRelevantClassFeature(feature));
  }

  private setClassInformation() {
    let levelOneFeatures = '<span class="fw-bold">' + this._playerClass?.classCoreFeature.name + '</span>' + 
        ', ' + 
        this._playerClass?.classFeatures
          .filter(feature => feature.levels.includes(1))
          .filter(feature => this.isRelevantClassFeature(feature))
          .map(feature => this.mapFeatureName(feature))
          .join(', ');

    this.classFeaturesPerLevel = [levelOneFeatures];

    for (let i = 2; i <= 12; i++) {
      var featuresAtCurrentLevel = this._playerClass?.classFeatures
          .filter(feature => feature.levels.includes(i))
          .filter(feature => this.isRelevantClassFeature(feature))
          .map(feature => this.mapFeatureName(feature))
          .join(', ');

      if (featuresAtCurrentLevel != undefined) {
        this.classFeaturesPerLevel.push(featuresAtCurrentLevel)
      } else {
        this.classFeaturesPerLevel.push('-')
      }
    }
  }

  private isRelevantClassFeature(feature: { relatedClassPath: string | null }) {
    return feature.relatedClassPath === this._classPath || feature.relatedClassPath === null || this._classPath === 'All Classpaths';
  }

  private mapFeatureName(feature: { name: string; relatedClassPath: null | string }): string {
    if (feature.relatedClassPath != null) {
      return '<span class="fst-italic">' + feature.name + '</span>'
    } else {
      return feature.name;
    }
  }
}
