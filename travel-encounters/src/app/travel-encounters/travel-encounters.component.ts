import { Component } from '@angular/core';
import { NgbDropdownItem, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TerrainType } from '../../util/terrain-types';
import { forestables, grasslandTables, riftlandsTables, roadTables, settlementTables } from '../../util/terrain-tables';

@Component({
  selector: 'app-travel-encounters',
  imports: [ NgbDropdownModule, NgbDropdownItem ],
  templateUrl: './travel-encounters.component.html',
  styleUrl: './travel-encounters.component.scss'
})
export class TravelEncountersComponent {
  readonly TerrainType = TerrainType;
  selectedTerrainType = TerrainType.ROAD;
  weather = '';
  travelCircumstance = '';
  travelEvent = '';

  generateTravelEncounter(): void {
    switch(this.selectedTerrainType) {
      case TerrainType.ROAD:
        this.weather = roadTables.weatherTables.roll();
        this.travelCircumstance = roadTables.travelCircumstances.roll();
        this.travelEvent = roadTables.mainEventsTable.roll();
        break;
      case TerrainType.GRASSLAND:
        this.weather = grasslandTables.weatherTables.roll();
        this.travelCircumstance = grasslandTables.travelCircumstances.roll();
        this.travelEvent = grasslandTables.mainEventsTable.roll();
        break;
      case TerrainType.FOREST:
        this.weather = forestables.weatherTables.roll();
        this.travelCircumstance = forestables.travelCircumstances.roll();
        this.travelEvent = forestables.mainEventsTable.roll();
        break;
      case TerrainType.SETTLEMENT:
        this.weather = settlementTables.weatherTables.roll();
        this.travelCircumstance = settlementTables.travelCircumstances.roll();
        this.travelEvent = settlementTables.mainEventsTable.roll();
        break;
      case TerrainType.RIFTLANDS:
        this.weather = riftlandsTables.weatherTables.roll();
        this.travelCircumstance = riftlandsTables.travelCircumstances.roll();
        this.travelEvent = riftlandsTables.mainEventsTable.roll();
        break;
    }
  }
}