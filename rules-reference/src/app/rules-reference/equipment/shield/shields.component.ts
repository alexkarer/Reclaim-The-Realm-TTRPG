import { Component } from '@angular/core';
import { DynamicContentComponent } from '../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../shared/text-utils/keyword-processor';
import { shields } from '../../../../../../common_resources/equipment/shields/shields';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';

import shieldRulesJson from '../../../../../../common_resources/equipment/shields/shieldRules.json';

@Component({
  selector: 'app-shields',
  imports: [DynamicContentComponent, KeywordProcessorPipe, NgbScrollSpyFragment],
  templateUrl: './shields.component.html',
  styleUrl: './shields.component.scss'
})
export class ShieldsComponent {
  public readonly shieldRules = shieldRulesJson;
  public readonly shields = shields;
}
