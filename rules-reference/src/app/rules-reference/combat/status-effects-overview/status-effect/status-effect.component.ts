import { Component, input } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { DynamicContentComponent } from '../../../../shared/text-utils/dynamic-component-rendering/dynamic-content.component';
import { KeywordProcessorPipe } from '../../../../shared/text-utils/keyword-processor';

@Component({
    selector: 'app-status-effect',
    imports: [NgbScrollSpyFragment, DynamicContentComponent, KeywordProcessorPipe],
    templateUrl: './status-effect.component.html',
    styleUrl: './status-effect.component.scss'
})
export class StatusEffectComponent {

  name = input<string>('');
  description = input<string>(''); 
  link = input<string>('');
}
