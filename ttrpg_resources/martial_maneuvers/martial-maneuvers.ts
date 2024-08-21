import { Ability } from '../globals/Ability';
import { Requirements } from '../globals/AbilityRequirements';
import basicManeuversJson from './basic_maneuvers.json';

export class MartialManeuver extends Ability {
    maneuverPush?: {
        pushingExtraCost: string;
        pushingDescription: string;
    }
}

export const basicAgileManeuvers: MartialManeuver[] = basicManeuversJson.agileManuevers.map(json => mapJsonMartialManeuverToType(json));


function mapJsonMartialManeuverToType(jsonManeuver: {
        name: string;
        tags: string[];
        requirements: Requirements;
        range: string;
        target: string;
        duration: string;
        description: string;
        maneuverPush: {
            pushingExtraCost: string;
            pushingDescription: string;
        }
    }
): MartialManeuver {
    let martialManeuver = new MartialManeuver();
    martialManeuver.name = jsonManeuver.name;
    martialManeuver.tags = jsonManeuver.tags;
    martialManeuver.requirements = jsonManeuver.requirements;
    martialManeuver.range = jsonManeuver.range;
    martialManeuver.target = jsonManeuver.target;
    martialManeuver.duration = jsonManeuver.duration;
    martialManeuver.description = jsonManeuver.description;
    martialManeuver.maneuverPush = jsonManeuver.maneuverPush;
    return martialManeuver;
}