import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {getState, setState} from "../../services/switch";
import {boolToThingState, ThingState, thingStateToBool} from "../../utils/enums";

interface ISwitchState {
    on: ThingState
}

export const SwitchControl: FC<{ thingId: string }> = ({ thingId }) => {
    let mounted = useRef(false);
    const [switchState, setSwitchState] = useState<ISwitchState>({on: ThingState.PENDING});

    useEffect(() => {
        getState(thingId).then(state => {
            const on: boolean = state.state.on;
            setSwitchState({ on: boolToThingState(on) });
            mounted.current = true;
        });
    }, []);

    function handleSet(on: ThingState) {
        const payload = {
            on: +thingStateToBool(on)
        };
        setState(thingId, payload).then(state => {
            const on: boolean = state.on;
            setSwitchState({on: boolToThingState(on)});
        });
    }

    function printSwitchState(s: ISwitchState): string {
        switch (s.on) {
            case ThingState.OFF:
                return "OFF";
            case ThingState.ON:
                return "ON";
            default:
                return "___";
        }
    }
    const printState = useMemo(() => printSwitchState(switchState), [ switchState ]);

    return (
        <>
            <h1>Your switch is { printState }</h1>
            <button onClick={() => handleSet(ThingState.ON)}>ON</button>
            <button onClick={() => handleSet(ThingState.OFF)}>OFF</button>
        </>
    );
}
