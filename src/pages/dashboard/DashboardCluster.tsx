import React, {FC, useEffect, useMemo} from "react";
import {ICluster, IFamily} from "../../utils/interfaces";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {getFamilyClusters} from "../../services/api/family";
import {ClusterBox} from "../../components/ui/dashboard/ClusterBox";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Title} from "../../components/ui/dashboard/Title";
import Link from "@material-ui/core/Link";
import {Chart} from "../../components/ui/dashboard/Chart";
import {Deposits} from "../../components/ui/dashboard/Deposits";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    const fixedHeightNewThingPaper = clsx(classes.paper, classes.fixedHeightNewThing);
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

    function renderThings() {
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
    const thingBoxes = useMemo(() => renderThings(), [things]);

    return (
        <div>
            <Typography component="h1" variant="h6" color="inherit" display="block">Things</Typography>
            <br/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {thingBoxes}
                    {/* Add a new thing! */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightNewThingPaper}>
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Add New Thing
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <TextField required id="thingName" label="Thing Name" fullWidth autoComplete="thing-name" />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            required
                                            id="thingPassword"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            autoComplete="thing-password"
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>

    );
};
