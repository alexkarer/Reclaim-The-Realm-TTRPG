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
  public attributesLeft: Attribute[] = halveArray(attributes)[0];
  public attributesRight: Attribute[] = halveArray(attributes)[1];
}
