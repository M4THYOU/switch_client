import React, {FC, useEffect, useMemo} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Chart} from "../../components/ui/dashboard/Chart";
import {Deposits} from "../../components/ui/dashboard/Deposits";
import {Orders} from "../../components/ui/dashboard/Orders";
import clsx from "clsx";
import {dashboardMainStyles} from "../../styles/main";
import {IThing} from "../../utils/interfaces";
import {Thing} from "../../components/ui/things/Thing";
import {getThings} from "../../services/api/switch";

export const DashboardMain: FC = () => {
    const classes = dashboardMainStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [things, setThings] = React.useState<Array<IThing>>([]);

    useEffect(() => {
        getThings().then(res => {
            const resThings: Array<IThing> = res.things;
            setThings(resThings);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    function renderThings() {
        return things.map(thing => {
            return (
                <Grid item xs={12} md={4} lg={3} key={thing.id}>
                    <Paper className={fixedHeightPaper}>
                        <Thing thing={ thing } />
                    </Paper>
                </Grid>
            );
        });
    }
    const thingBoxes = useMemo(() => renderThings(), [things]);

    return (
        <Grid container spacing={3}>
            { thingBoxes }
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>
    );
};
