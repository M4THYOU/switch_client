
export enum ThingState {
    OFF,
    ON,
    PENDING,
    ERROR
}
export function boolToThingState(b: boolean): ThingState {
    return +b;
}
// Should only be used w/ ON and OFF
export function thingStateToBool(s: ThingState): boolean {
    return s === ThingState.ON;
}

export enum DashboardPage {
    MAIN = 'MAIN',
    NEW_FAMILY = 'NEW_FAMILY',
    FAMILY = 'FAMILY',
    CLUSTER = 'CLUSTER',
    NEW_THING = 'NEW_THING',
    INVITE_USER = 'INVITE_USER'
}

export enum ThingType {
    SWITCH = 1
}
