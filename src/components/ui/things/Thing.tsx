import React, {FC, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {IThing} from "../../../utils/interfaces";
import Typography from "@material-ui/core/Typography";
import {ThingType} from "../../../utils/enums";
import {SwitchMain} from "./SwitchMain";

function preventDefault(e: any) {
    e.preventDefault();
}
const useStyles = makeStyles({
    root: {
        flex: 1,
    },
    sideBySide: {
        display: 'flex',
        flexDirection: 'row',
    },
    subtitle: {
        marginTop: 'auto',
        marginLeft: 'auto'
    }
});

export const Thing: FC<{thing: IThing}> = ({ thing }) => {
    const classes = useStyles();

    function renderThing() {
        switch (thing.thing_type_id) {
            case ThingType.SWITCH:
                return <SwitchMain thing={thing} />;
        }
    }
    const curThing = useMemo(() => renderThing(), [thing]);

    return (
        <React.Fragment>
            <div className={classes.sideBySide}>
                <Typography component="h2" variant="h6" color="primary">{thing.name}</Typography>
                <Typography component="p" variant="subtitle1" color="textSecondary" className={classes.subtitle}>Switch</Typography>
            </div>
            { curThing }
        </React.Fragment>
    );
}
