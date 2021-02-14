import React, {FC, useEffect, useMemo} from "react";
import {ICluster, IFamily} from "../../utils/interfaces";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {getFamilyClusters} from "../../services/api/family";
import {ClusterBox} from "../../components/ui/dashboard/ClusterBox";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const customStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        cursor: 'pointer'
    },
    fixedHeight: {
        height: 240,
    }
}));

export const DashboardCluster: FC<{ cluster: ICluster }> = ({ cluster }) => {
    const classes = customStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [things, setThings] = React.useState<Array<ICluster>>([]);

    useEffect(() => {
        console.log('get cluster things');
        // getFamilyClusters(family.family_group_id).then(res => {
        //     const clusts: Array<ICluster> = res.clusters;
        //     setClusters(clusts);
        // }).catch(e => {
        //     console.error(e);
        // });
    }, []);

    function renderClusters() {
        return things.map(thing => {
            return (
                <></>
                // <Grid item xs={12} md={4} lg={3} key={thing.id}>
                //     <Paper className={fixedHeightPaper}>
                //         <ClusterBox cluster={ cluster } />
                //     </Paper>
                // </Grid>
            );
        });
    }
    const thingBoxes = useMemo(() => renderClusters(), [things]);

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
