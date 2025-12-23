import { Component } from '@angular/core';
import { RulesReferencePageNavigationComponent } from '../../shared/page-navigation/page-navigation.component';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { ResolveTextKeyPipe } from "../../../shared/text-utils/resolve-text-key";
import { TextProcessorPipe } from "../../../shared/text-utils/text-processor";

@Component({
  selector: 'app-introduction-page',
  imports: [RulesReferencePageNavigationComponent, DynamicContentComponent, ResolveTextKeyPipe, TextProcessorPipe],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.scss'
})
export class IntroductionPageComponent {
  public readonly pageId = 'introduction';
}
