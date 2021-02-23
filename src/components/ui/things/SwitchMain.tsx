import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {getState, setState} from "../../../services/api/switch";
import {boolToThingState, ThingState, thingStateToBool} from "../../../utils/enums";
import {IThing} from "../../../utils/interfaces";

import switchOff from './switch_off.svg';
import switchOn from './switch_on.svg';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {InPlaceLoadingSpinner} from "../InPlaceLoadingSpinner";

interface ISwitchState {
    on: ThingState
}

const useStyles = makeStyles({
    root: {
        flex: 1,
        textAlign: 'center'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '1rem'
    },
    image: {
        height: 115
    },
    onButton: {
        // background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        background: '#f8f8ff',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 0 5px 1px lightgrey',
        color: 'black',
        height: 48,
        padding: '0 0px',
    },
    offButton: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#f8f8ff',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 0 5px 1px lightgrey',
        color: 'black',
        height: 48,
        padding: '0 0px',
    },
});

export const SwitchMain: FC<{ thing: IThing }> = ({ thing }) => {
    const classes = useStyles();
    let mounted = useRef(false);
    const [switchState, setSwitchState] = useState<ISwitchState>({on: ThingState.PENDING});

    useEffect(() => {
        getState(thing.aws_name).then(state => {
            const on: boolean = state.state.on;
            setSwitchState({ on: boolToThingState(on) });
            mounted.current = true;
        }).catch(e => {
            console.error(e);
        });
    }, []);

    function handleSet(on: ThingState) {
        const payload = {
            on: +thingStateToBool(on)
        };
        setSwitchState({on: ThingState.PENDING});
        setState(thing.aws_name, payload).then(state => {
            const on: boolean = state.on;
            setSwitchState({on: boolToThingState(on)});
        }).catch(e => {
            console.error(e);
        });
    }

    function renderSwitchState() {
        switch (switchState.on) {
            case ThingState.OFF:
                return <img src={switchOff} className={classes.image} alt="switch off image" />;
            case ThingState.ON:
                return <img src={switchOn} className={classes.image} alt="switch on image" />;
            default:
                return <InPlaceLoadingSpinner isShowing={true} />;
        }
    }
    const renderState = useMemo(() => renderSwitchState(), [ switchState ])

    return (
        <div className={classes.root} >
            { renderState }
            {/*<h1>Your switch is { printState }</h1>*/}
            <div className={classes.buttons}>
                <Button className={classes.onButton} onClick={() => handleSet(ThingState.ON)}>ON</Button>
                <Button className={classes.offButton} onClick={() => handleSet(ThingState.OFF)}>OFF</Button>
            </div>
        </div>
    );
}
