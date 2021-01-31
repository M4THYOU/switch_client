
export enum ThingState {
    OFF,
    ON,
    PENDING
}
export function boolToThingState(b: boolean): ThingState {
    return +b;
}
// Should only be used w/ ON and OFF
export function thingStateToBool(s: ThingState): boolean {
    return s === ThingState.ON;
}
