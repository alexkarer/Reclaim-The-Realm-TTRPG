import roadWeatherJson from './../resources/road/weather.json';
import roadCircumstancesJson from './../resources/road/travel_circumstances.json';
import roadMainEventsJson from './../resources/road/main_events_table.json';
import roadExplorationEventsJson from './../resources/road/exploration_events.json';
import roadRoleplayEncountersJson from './../resources/road/roleplay_encounters.json';
import roadCombatEncountersJson from './../resources/road/combat_encounters.json';

import forestWeatherJson from './../resources/forest/weather.json';

import grasslandWeatherJson from './../resources/grassland/weather.json';

import riftlandsWeatherJson from './../resources/riftlands/weather.json';
import riftlandsCircumstancesJson from './../resources/riftlands/travel_circumstances.json';
import riftlandsMainEventsJson from './../resources/riftlands/main_events_table.json';
import riftlandsExplorationEventsJson from './../resources/riftlands/exploration_events.json';
import riftlandsRoleplayEncountersJson from './../resources/riftlands/roleplay_encounters.json';
import riftlandsCombatEncountersJson from './../resources/riftlands/combat_encounters.json';

import settlementWeatherJson from './../resources/settlement/weather.json';
import { diceRoll } from './random';
import { evaluateDiceExpression } from './dice-expression';


export type WeatherTableJson = typeof roadWeatherJson | typeof forestWeatherJson | typeof grasslandWeatherJson | typeof riftlandsWeatherJson | typeof settlementWeatherJson;
type TableJson = typeof roadCircumstancesJson;
type TableEntryJson = typeof roadCircumstancesJson.table[0];

export class Table {
    public name!: string;
    private max!: number;
    private tableEntries!: TableEntry[];

    roll(): string {
        let diceResult = diceRoll(this.max);
        for (let entry of this.tableEntries) {
            if (entry.isWithin(diceResult)) {
                return this.parseRollResult(entry.result);
            }
        }
        console.error('Roll result "' + diceResult.toString() + '" not in table "' + this.name + '" ');
        return '-';
    }

    private parseRollResult(rawResult: string): string {
        if (rawResult.indexOf('[') === -1) {
            return rawResult;
        }
    
        var result = '';
        let lastKeywordIndex = 0;
        while (rawResult.indexOf('[', lastKeywordIndex) !== -1) {
            let keywordIndex = rawResult.indexOf('[', lastKeywordIndex);
            let textBeforeKeyword = rawResult.substring(lastKeywordIndex, keywordIndex);
    
            if (textBeforeKeyword.length !== 0) {
                result += textBeforeKeyword;
            }

            let keywordCommand = rawResult.substring(keywordIndex + 1, rawResult.indexOf(' ', keywordIndex));
            let commandText = rawResult.substring(rawResult.indexOf(' ', keywordIndex) + 1, rawResult.indexOf(']', keywordIndex));
            switch(keywordCommand) {
                case 'TABLE':
                    result += allTables.get(commandText)?.roll() ?? 'Error Table "' + commandText + '" not found';
                    break;
                case 'EVAL':
                    result += evaluateDiceExpression(commandText);
                    break;
            }
            
            lastKeywordIndex = rawResult.indexOf(']', keywordIndex) + 1;
        }

        if (lastKeywordIndex !== (rawResult.length -1)) {
            let remainingText = rawResult.substring(lastKeywordIndex, rawResult.length);
            result += remainingText;
        }

        return result;
    }

    constructor(name: string, max: number, tableEntries: TableEntry[]) {
        this.name = name;
        this.max = max;
        this.tableEntries = tableEntries;
    }
}

export class WeatherTables {
    public temperatureTable!: Table;
    public precipitationTable!: Table;
    public specialPhenomanonTable!: Table;

    roll(): string {
        return this.temperatureTable.roll() + ', ' + this.precipitationTable.roll() + ', ' + this.specialPhenomanonTable.roll();
    }

    constructor(temperatureTable: Table, precipitationTable: Table, specialPhenomanonTable: Table) {
        this.temperatureTable = temperatureTable;
        this.precipitationTable = precipitationTable;
        this.specialPhenomanonTable = specialPhenomanonTable;
    }
}

export class TableEntry {
    private lowerBound!: number;
    private upperBound!: number;
    result!: string;

    constructor(lowerBound: number, upperBound: number, result: string) {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.result = result;
    }

    isWithin(roll: number): boolean {
        return (this.lowerBound <= roll) && (this.upperBound >= roll);
    }
}

export class TerrainTables {
    public weatherTables!: WeatherTables;
    public travelCircumstances!: Table;
    mainEventsTable!: Table;

    constructor(weatherTables: WeatherTables, travelCircumstances: Table, mainEventsTable: Table) {
        this.weatherTables = weatherTables;
        this.travelCircumstances = travelCircumstances;
        this.mainEventsTable = mainEventsTable;
    }
}

function parseWeatherTables(json: WeatherTableJson): WeatherTables {
    return new WeatherTables(parseTable(json.temperatureTable), parseTable(json.precipitationTable), parseTable(json.specialPhenomanonTable))
}

function parseTable(json: TableJson): Table {
    return new Table(json.name, json.upperLimit, json.table.map(t => parseTableEntries(t)));
}

function parseTableEntries(json: TableEntryJson): TableEntry {
    return new TableEntry(json.lower, json.upper, json.result);
}

export const roadTables = new TerrainTables(parseWeatherTables(roadWeatherJson), parseTable(roadCircumstancesJson), parseTable(roadMainEventsJson));
export const forestables = new TerrainTables(parseWeatherTables(roadWeatherJson), parseTable(roadCircumstancesJson), parseTable(roadMainEventsJson));
export const grasslandTables = new TerrainTables(parseWeatherTables(roadWeatherJson), parseTable(roadCircumstancesJson), parseTable(roadMainEventsJson));
export const riftlandsTables = new TerrainTables(parseWeatherTables(roadWeatherJson), parseTable(roadCircumstancesJson), parseTable(roadMainEventsJson));
export const settlementTables = new TerrainTables(parseWeatherTables(roadWeatherJson), parseTable(roadCircumstancesJson), parseTable(roadMainEventsJson));

const allTables = new Map<string, Table>();
// Road
allTables.set(roadWeatherJson.precipitationTable.name, parseTable(roadWeatherJson.precipitationTable));
allTables.set(roadWeatherJson.temperatureTable.name, parseTable(roadWeatherJson.temperatureTable));
allTables.set(roadWeatherJson.specialPhenomanonTable.name, parseTable(roadWeatherJson.specialPhenomanonTable));
allTables.set(roadCircumstancesJson.name, parseTable(roadCircumstancesJson));
allTables.set(roadMainEventsJson.name, parseTable(roadMainEventsJson));
allTables.set(roadExplorationEventsJson.name, parseTable(roadExplorationEventsJson));
allTables.set(roadRoleplayEncountersJson.name, parseTable(roadRoleplayEncountersJson));
allTables.set(roadCombatEncountersJson.name, parseTable(roadCombatEncountersJson));

// Forest
allTables.set(forestWeatherJson.precipitationTable.name, parseTable(forestWeatherJson.precipitationTable));
allTables.set(forestWeatherJson.temperatureTable.name, parseTable(forestWeatherJson.temperatureTable));
allTables.set(forestWeatherJson.specialPhenomanonTable.name, parseTable(forestWeatherJson.specialPhenomanonTable));
allTables.set(roadCircumstancesJson.name, parseTable(roadCircumstancesJson));
allTables.set(roadMainEventsJson.name, parseTable(roadMainEventsJson));
allTables.set(roadExplorationEventsJson.name, parseTable(roadExplorationEventsJson));
allTables.set(roadRoleplayEncountersJson.name, parseTable(roadRoleplayEncountersJson));
allTables.set(roadCombatEncountersJson.name, parseTable(roadCombatEncountersJson));

// Grassland
allTables.set(grasslandWeatherJson.precipitationTable.name, parseTable(grasslandWeatherJson.precipitationTable));
allTables.set(grasslandWeatherJson.temperatureTable.name, parseTable(grasslandWeatherJson.temperatureTable));
allTables.set(grasslandWeatherJson.specialPhenomanonTable.name, parseTable(grasslandWeatherJson.specialPhenomanonTable));
allTables.set(roadCircumstancesJson.name, parseTable(roadCircumstancesJson));
allTables.set(roadMainEventsJson.name, parseTable(roadMainEventsJson));
allTables.set(roadExplorationEventsJson.name, parseTable(roadExplorationEventsJson));
allTables.set(roadRoleplayEncountersJson.name, parseTable(roadRoleplayEncountersJson));
allTables.set(roadCombatEncountersJson.name, parseTable(roadCombatEncountersJson));

// Riftlands
allTables.set(riftlandsWeatherJson.precipitationTable.name, parseTable(riftlandsWeatherJson.precipitationTable));
allTables.set(riftlandsWeatherJson.temperatureTable.name, parseTable(riftlandsWeatherJson.temperatureTable));
allTables.set(riftlandsWeatherJson.specialPhenomanonTable.name, parseTable(riftlandsWeatherJson.specialPhenomanonTable));
allTables.set(riftlandsCircumstancesJson.name, parseTable(riftlandsCircumstancesJson));
allTables.set(riftlandsMainEventsJson.name, parseTable(riftlandsMainEventsJson));
allTables.set(riftlandsExplorationEventsJson.name, parseTable(riftlandsExplorationEventsJson));
allTables.set(riftlandsRoleplayEncountersJson.name, parseTable(riftlandsRoleplayEncountersJson));
allTables.set(riftlandsCombatEncountersJson.name, parseTable(riftlandsCombatEncountersJson));

// Settlement
allTables.set(settlementWeatherJson.precipitationTable.name, parseTable(settlementWeatherJson.precipitationTable));
allTables.set(settlementWeatherJson.temperatureTable.name, parseTable(settlementWeatherJson.temperatureTable));
allTables.set(settlementWeatherJson.specialPhenomanonTable.name, parseTable(settlementWeatherJson.specialPhenomanonTable));
allTables.set(roadCircumstancesJson.name, parseTable(roadCircumstancesJson));
allTables.set(roadMainEventsJson.name, parseTable(roadMainEventsJson));
allTables.set(roadExplorationEventsJson.name, parseTable(roadExplorationEventsJson));
allTables.set(roadRoleplayEncountersJson.name, parseTable(roadRoleplayEncountersJson));
allTables.set(roadCombatEncountersJson.name, parseTable(roadCombatEncountersJson));