import { Component } from '@angular/core';
import { Attribute, attributes } from '../../../../../ttrpg_resources/character_values/attributes/attribute';
import { DynamicContentComponent } from "../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { KeywordProcessorPipe } from "../../../shared/text-utils/keyword-processor";

@Component({
    selector: 'app-attributes-list',
    imports: [DynamicContentComponent, NgbScrollSpyFragment, KeywordProcessorPipe],
    templateUrl: './attributes-list.component.html',
    styleUrl: './attributes-list.component.scss'
})
export class AttributesListComponent {
  public attributesLeft: Attribute[] = attributes.slice(0,3);
  public attributesRight: Attribute[] = attributes.slice(3,7);
}
