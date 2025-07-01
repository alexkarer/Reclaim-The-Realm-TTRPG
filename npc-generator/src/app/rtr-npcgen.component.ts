import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreviewComponent } from './npc-preview/preview.component';
import { GeneratorComponent } from "./generator/generator.component";

@Component({
    selector: 'rtr-npcgen-root',
    templateUrl: './rtr-npcgen.component.html',
    styleUrl: './rtr-npcgen.component.scss',
    imports: [RouterOutlet, PreviewComponent, GeneratorComponent]
})
export class RtRNpcGenComponent {
  title = 'rtr-npc-creator';
}
