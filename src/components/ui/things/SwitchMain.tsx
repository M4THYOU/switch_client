import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {getState, setState} from "../../../services/api/switch";
import {boolToThingState, ThingState, thingStateToBool} from "../../../utils/enums";
import {IThing} from "../../../utils/interfaces";
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

import switchOff from './switch_off.svg';
import switchOn from './switch_on.svg';
import {LoadingSpinner} from "../LoadingSpinner";

interface ISwitchState {
    on: ThingState
}

export const SwitchMain: FC<{ thing: IThing }> = ({ thing }) => {
    let mounted = useRef(false);
    const [switchState, setSwitchState] = useState<ISwitchState>({on: ThingState.PENDING});

    useEffect(() => {
        // getState(thingId).then(state => {
        //     const on: boolean = state.state.on;
        //     setSwitchState({ on: boolToThingState(on) });
        //     mounted.current = true;
        // });
    }, []);

    function handleSet(on: ThingState) {
        const payload = {
            on: +thingStateToBool(on)
        };
        setSwitchState({on});
        // setState(thingId, payload).then(state => {
        //     const on: boolean = state.on;
        //     setSwitchState({on: boolToThingState(on)});
        // });
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
    function renderSwitchState() {
        switch (switchState.on) {
            case ThingState.OFF:
                return <img src={switchOff} className="App-logo" alt="logo" />;
            case ThingState.ON:
                return <img src={switchOn} className="App-logo" alt="logo" />;
            default:
                // return <LoadingSpinner isShowing={true} />;
                return <></>;
        }
    }
    const printState = useMemo(() => printSwitchState(switchState), [ switchState ]);
    const renderState = useMemo(() => renderSwitchState(), [ switchState ])

    return (
        <div>
            { renderState }
            {/*<img src={switchOn} className="App-logo" alt="logo" />*/}
            <h1>Your switch is { printState }</h1>
            <button onClick={() => handleSet(ThingState.ON)}>ON</button>
            <button onClick={() => handleSet(ThingState.OFF)}>OFF</button>
        </div>
    );
}
