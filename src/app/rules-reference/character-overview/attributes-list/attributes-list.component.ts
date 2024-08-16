import { Component } from '@angular/core';
import { Attribute, attributes } from '../../../../../ttrpg_resources/character_values/attributes/attribute';
import { AttributeComponent } from "./attribute/attribute.component";

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [AttributeComponent],
  templateUrl: './attributes-list.component.html',
  styleUrl: './attributes-list.component.scss'
})
export class AttributesListComponent {
  public attributes: Attribute[] = attributes;
}
