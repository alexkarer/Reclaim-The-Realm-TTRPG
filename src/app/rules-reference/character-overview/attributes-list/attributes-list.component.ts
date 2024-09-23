import { Component } from '@angular/core';
import { Attribute, attributes } from '../../../../../ttrpg_resources/character_values/attributes/attribute';
import { AttributeComponent } from "./attribute/attribute.component";
import { halveArray } from '../../../shared/utils/array-utils';

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [AttributeComponent],
  templateUrl: './attributes-list.component.html',
  styleUrl: './attributes-list.component.scss'
})
export class AttributesListComponent {
  public attributesLeft: Attribute[] = attributes.slice(0,3);
  public attributesRight: Attribute[] = attributes.slice(3,7);
}
