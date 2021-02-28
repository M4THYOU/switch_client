import React, {FC, useEffect, useMemo} from "react";
import {ICluster, IThing} from "../../utils/interfaces";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Thing} from "../../components/ui/things/Thing";
import {getClusterThings} from "../../services/api/cluster";

// TODO ADD ALL THAT THING RENDERING FROM THE DASHBOARD IN HERE TOO

const customStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeightNewThing: {
        height: 200
    },
    boxContext: {
        flex: 1,
    }
}));

export const DashboardCluster: FC<{ cluster: ICluster }> = ({ cluster }) => {
    const classes = customStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [things, setThings] = React.useState<Array<IThing>>([]);

    useEffect(() => {
        console.log('get cluster things');
        getClusterThings(cluster.cluster_group_id).then(res => {
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
        <div>
            <Typography component="h1" variant="h6" color="inherit" display="block">Things</Typography>
            <br/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {thingBoxes}
                </Grid>
            </div>
        </div>

    );
};
