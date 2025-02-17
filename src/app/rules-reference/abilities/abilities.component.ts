import { Component } from '@angular/core';
import { MartialManeuversComponent } from "./martial-maneuvers/martial-maneuvers.component";
import { SpellsComponent } from "./spells/spells.component";
import { HybridAbilitiesComponent } from "./hybrid-abilities/hybrid-abilities.component";
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-abilities',
    imports: [MartialManeuversComponent, SpellsComponent, HybridAbilitiesComponent, NgbScrollSpyFragment],
    templateUrl: './abilities.component.html',
    styleUrl: './abilities.component.scss'
})
export class AbilitiesComponent {

}
