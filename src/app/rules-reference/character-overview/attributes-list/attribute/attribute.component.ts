import { Component, Input } from '@angular/core';
import { Attribute } from '../../../../../../ttrpg_resources/character_values/attributes/attribute';
import { KeywordProcessorPipe } from "../../../../shared/text-transformer/text-transformer";
import { KeywordComponent } from "../../../../shared/keyword/keyword.component";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from "../../../../shared/dynamic-component-rendering/dynamic-content.component";

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [KeywordProcessorPipe, KeywordComponent, NgbScrollSpyFragment, DynamicContentComponent],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent {

  @Input() public attribute?: Attribute;

  public get attributeName(): string {
    let attributeName = this.attribute?.name;
    if (attributeName) {
      return attributeName;
    } else {
      return '';
    }
  }
}
