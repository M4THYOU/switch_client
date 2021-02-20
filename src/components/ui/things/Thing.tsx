import React, {FC, useMemo} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {IThing} from "../../../utils/interfaces";
import {Title} from "../dashboard/Title";
import Typography from "@material-ui/core/Typography";
import {DashboardPage, ThingType} from "../../../utils/enums";
import {DashboardMain} from "../../../pages/dashboard/DashboardMain";
import {DashboardNewFamily} from "../../../pages/dashboard/DashboardNewFamily";
import {DashboardFamily} from "../../../pages/dashboard/DashboardFamily";
import {DashboardCluster} from "../../../pages/dashboard/DashboardCluster";
import {DashboardNewThing} from "../../../pages/dashboard/DashboardNewThing";
import {SwitchMain} from "./SwitchMain";

function preventDefault(e: any) {
    e.preventDefault();
}
const useStyles = makeStyles({
    root: {
        flex: 1,
    },
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
            <Title>{thing.name}</Title>
            { curThing }
        </React.Fragment>
    );
}
