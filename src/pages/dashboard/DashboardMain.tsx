import React, {FC} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Chart} from "../../components/ui/dashboard/Chart";
import {Deposits} from "../../components/ui/dashboard/Deposits";
import {Orders} from "../../components/ui/dashboard/Orders";
import clsx from "clsx";
import {dashboardMainStyles} from "../../styles/main";

export const DashboardMain: FC = () => {
    const classes = dashboardMainStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container spacing={3}>
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