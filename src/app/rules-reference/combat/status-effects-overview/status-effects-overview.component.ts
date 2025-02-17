import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { StatusEffectComponent } from "./status-effect/status-effect.component";
import statusEffectsJson from '../../../../../ttrpg_resources/combat/status_effects.json'

@Component({
    selector: 'app-status-effects-overview',
    imports: [DynamicContentComponent, KeywordProcessorPipe, StatusEffectComponent],
    templateUrl: './status-effects-overview.component.html',
    styleUrl: './status-effects-overview.component.scss'
})
export class StatusEffectsOverviewComponent {
  public readonly statusEffectsJson = statusEffectsJson;
}
