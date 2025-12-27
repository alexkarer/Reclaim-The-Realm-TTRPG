import { Component, input } from '@angular/core';
import { AbilityAction, AbilityActionType } from '../../../../../../../common_resources/shared/Ability';
import { DynamicContentComponent } from "../../../text-utils/dynamic-component-rendering/dynamic-content.component";
import { TextProcessorPipe } from "../../../text-utils/text-processor";

@Component({
  selector: 'app-ability-action',
  imports: [DynamicContentComponent, TextProcessorPipe],
  templateUrl: './ability-action.component.html',
  styleUrl: './ability-action.component.scss',
})
export class AbilityActionComponent {
  action = input<AbilityAction>();

  get actionType(): string {
    const at = this.action()?.type;
    let text: string | undefined;
    if (!at) {
      console.error('unable to determine action type', this.action());
      return 'unspecified';
    }

    // TODO why not possible for FIXED????
    switch(at) {
      case AbilityActionType.MARTIAL_TEST: break;
      case AbilityActionType.SPELL_TEST: break;
      case AbilityActionType.D20_TEST: break;
      case AbilityActionType.CUSTOM_CONDITION: text = this.action()?.customCondition; break;
    }

    if (!text) {
      console.error('unable to determine action type', this.action());
      return 'unspecified';
    }
    return text;
  }
}
