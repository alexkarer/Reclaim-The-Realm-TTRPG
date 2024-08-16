import { Component, Input } from '@angular/core';
import { Attribute } from '../../../../../../ttrpg_resources/character_values/attributes/attribute';
import { TextTransformerPipe } from "../../../../shared/text-transformer/text-transformer";

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [TextTransformerPipe],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent {

  @Input() public attribute?: Attribute;
}
