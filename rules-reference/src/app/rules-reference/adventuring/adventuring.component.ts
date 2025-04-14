import { Component } from '@angular/core';
import { NgbScrollSpyFragment } from '@ng-bootstrap/ng-bootstrap';
import { TravelComponent } from "./travel/travel.component";
import { AdventuringHazardsComponent } from "./adventuring-hazards/adventuring-hazards.component";
import { ExhaustionAndRestingComponent } from "./exhaustion-and-resting/exhaustion-and-resting.component";
import { DeathAndResurrectionComponent } from "./death-and-resurrection/death-and-resurrection.component";

@Component({
    selector: 'app-adventuring',
    imports: [NgbScrollSpyFragment, TravelComponent, AdventuringHazardsComponent, ExhaustionAndRestingComponent, DeathAndResurrectionComponent],
    templateUrl: './adventuring.component.html',
    styleUrl: './adventuring.component.scss'
})
export class AdventuringComponent {

}
