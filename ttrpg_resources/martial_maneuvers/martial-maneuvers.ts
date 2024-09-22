import { Ability } from '../shared/Ability';
import { Requirements } from '../shared/AbilityRequirements';

import basicManeuversJson from './basic_maneuvers.json';
import advancedManeuversJson from './advanced_maneuvers.json';
import masterManeuversJson from './master_maneuvers.json';
import transcendentManeuversJson from './transcendent_maneuvers.json';

export class MartialManeuver extends Ability {
    maneuverPush?: {
        pushingExtraCost: string;
        pushingDescription: string;
    }
}

export type ManeuverCollection = {
    agileManeuvers: MartialManeuver[];
    brawlManeuvers: MartialManeuver[];
    leaderManeuvers: MartialManeuver[];
    fortitudeManeuvers: MartialManeuver[];
    tacticalManeuvers: MartialManeuver[];
    weaponManeuvers: MartialManeuver[];
}

export const basicAgileManeuvers: MartialManeuver[] = basicManeuversJson.agileManuevers.map(json => mapJsonMartialManeuverToType(json));
export const basicBrawlManeuvers: MartialManeuver[] = basicManeuversJson.brawlManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const basicLeaderManeuvers: MartialManeuver[] = basicManeuversJson.leaderManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const basicFortitudeManeuvers: MartialManeuver[] = basicManeuversJson.fortitudeManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const basicTacticalManeuvers: MartialManeuver[] = basicManeuversJson.tacticalManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const basicWeaponManeuvers: MartialManeuver[] = basicManeuversJson.weaponManeuvers.map(json => mapJsonMartialManeuverToType(json));

export const basicManeuvers: ManeuverCollection = {
    agileManeuvers: basicAgileManeuvers,
    brawlManeuvers: basicBrawlManeuvers,
    leaderManeuvers: basicLeaderManeuvers,
    fortitudeManeuvers: basicFortitudeManeuvers,
    tacticalManeuvers: basicTacticalManeuvers,
    weaponManeuvers: basicWeaponManeuvers
}

export const advancedAgileManeuvers: MartialManeuver[] = advancedManeuversJson.agileManuevers.map(json => mapJsonMartialManeuverToType(json));
export const advancedBrawlManeuvers: MartialManeuver[] = advancedManeuversJson.brawlManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const advancedLeaderManeuvers: MartialManeuver[] = advancedManeuversJson.leaderManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const advancedFortitudeManeuvers: MartialManeuver[] = advancedManeuversJson.fortitudeManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const advancedTacticalManeuvers: MartialManeuver[] = advancedManeuversJson.tacticalManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const advancedWeaponManeuvers: MartialManeuver[] = advancedManeuversJson.weaponManeuvers.map(json => mapJsonMartialManeuverToType(json));

export const advancedManeuvers: ManeuverCollection = {
    agileManeuvers: advancedAgileManeuvers,
    brawlManeuvers: advancedBrawlManeuvers,
    leaderManeuvers: advancedLeaderManeuvers,
    fortitudeManeuvers: advancedFortitudeManeuvers,
    tacticalManeuvers: advancedTacticalManeuvers,
    weaponManeuvers: advancedWeaponManeuvers
}

export const masterAgileManeuvers: MartialManeuver[] = masterManeuversJson.agileManuevers.map(json => mapJsonMartialManeuverToType(json));
export const masterBrawlManeuvers: MartialManeuver[] = masterManeuversJson.brawlManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const masterLeaderManeuvers: MartialManeuver[] = masterManeuversJson.leaderManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const masterFortitudeManeuvers: MartialManeuver[] = masterManeuversJson.fortitudeManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const masterTacticalManeuvers: MartialManeuver[] = masterManeuversJson.tacticalManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const masterWeaponManeuvers: MartialManeuver[] = masterManeuversJson.weaponManeuvers.map(json => mapJsonMartialManeuverToType(json));

export const masterManeuvers: ManeuverCollection = {
    agileManeuvers: masterAgileManeuvers,
    brawlManeuvers: masterBrawlManeuvers,
    leaderManeuvers: masterLeaderManeuvers,
    fortitudeManeuvers: masterFortitudeManeuvers,
    tacticalManeuvers: masterTacticalManeuvers,
    weaponManeuvers: masterWeaponManeuvers
}

export const transcendentAgileManeuvers: MartialManeuver[] = transcendentManeuversJson.agileManuevers.map(json => mapJsonMartialManeuverToType(json));
export const transcendentBrawlManeuvers: MartialManeuver[] = transcendentManeuversJson.brawlManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const transcendentLeaderManeuvers: MartialManeuver[] = transcendentManeuversJson.leaderManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const transcendentFortitudeManeuvers: MartialManeuver[] = transcendentManeuversJson.fortitudeManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const transcendentTacticalManeuvers: MartialManeuver[] = transcendentManeuversJson.tacticalManeuvers.map(json => mapJsonMartialManeuverToType(json));
export const transcendentWeaponManeuvers: MartialManeuver[] = transcendentManeuversJson.weaponManeuvers.map(json => mapJsonMartialManeuverToType(json));

export const transcendentManeuvers: ManeuverCollection = {
    agileManeuvers: transcendentAgileManeuvers,
    brawlManeuvers: transcendentBrawlManeuvers,
    leaderManeuvers: transcendentLeaderManeuvers,
    fortitudeManeuvers: transcendentFortitudeManeuvers,
    tacticalManeuvers: transcendentTacticalManeuvers,
    weaponManeuvers: transcendentWeaponManeuvers
}

function mapJsonMartialManeuverToType(jsonManeuver: {
        name: string;
        tags: string[];
        requirements: Requirements;
        cost: string;
        range: string;
        target: string;
        duration: string;
        description: string;
        maneuverPush?: {
            pushingExtraCost: string;
            pushingDescription: string;
        }
    }
): MartialManeuver {
    let martialManeuver = new MartialManeuver();
    martialManeuver.name = jsonManeuver.name;
    martialManeuver.tags = jsonManeuver.tags;
    martialManeuver.requirements = jsonManeuver.requirements;
    martialManeuver.cost = jsonManeuver.cost;
    martialManeuver.range = jsonManeuver.range;
    martialManeuver.target = jsonManeuver.target;
    martialManeuver.duration = jsonManeuver.duration;
    martialManeuver.description = jsonManeuver.description;
    martialManeuver.maneuverPush = jsonManeuver.maneuverPush;
    return martialManeuver;
}