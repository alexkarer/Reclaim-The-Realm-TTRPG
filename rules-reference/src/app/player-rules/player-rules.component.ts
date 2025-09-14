import { Component, inject, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbOffcanvas, NgbScrollSpy, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu } from '@ng-bootstrap/ng-bootstrap';
import { ResolveTextKeyPipe } from "../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../shared/text-utils/text-processor";
import { DynamicContentComponent } from '../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { SpeciesComponent } from './species/species.component';

import characterCreationStepsJson from "../../../../common_resources/player_rules/character_creation_steps.json";
import speciesJson from '../../../../common_resources/character/species.json';

@Component({
  selector: 'app-player-rules',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgbScrollSpy,
    NgbScrollSpyMenu,
    NgbScrollSpyItem,
    NgbScrollSpyFragment,
    ResolveTextKeyPipe,
    TextProcessorPipe,
    DynamicContentComponent,
    SpeciesComponent
],
  templateUrl: './player-rules.component.html',
  styleUrl: './player-rules.component.scss'
})
export class PlayerRulesComponent {

  public readonly characterCreationSteps = characterCreationStepsJson;
  public readonly speciesList = speciesJson;
  private offcanvasService = inject(NgbOffcanvas);

  openTableOfContents(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }
}
