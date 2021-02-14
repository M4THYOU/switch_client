import React, {FC, useEffect, useMemo} from "react";
import {ICluster, IFamily} from "../../utils/interfaces";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {getFamilyClusters} from "../../services/api/family";
import {ClusterBox} from "../../components/ui/dashboard/ClusterBox";
import {makeStyles} from "@material-ui/core/styles";

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
    }
}));

export const DashboardFamily: FC<{ family: IFamily, handleClusterClick: (cluster: ICluster) => void }> = ({ family, handleClusterClick }) => {
    const classes = customStyles();
    const [clusters, setClusters] = React.useState<Array<ICluster>>([]);

    useEffect(() => {
        getFamilyClusters(family.family_group_id).then(res => {
            const clusts: Array<ICluster> = res.clusters;
            setClusters(clusts);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    function renderClusters() {
        return clusters.map(cluster => {
            return (
                <Grid item xs={12} md={4} lg={3} key={cluster.id}>
                    <Paper className={classes.paper} onClick={() => handleClusterClick(cluster)}>
                        <ClusterBox cluster={ cluster } />
                    </Paper>
                </Grid>
            );
        });
    }
    const clusterBoxes = useMemo(() => renderClusters(), [clusters]);

    return (
        <div>
            <Typography component="h1" variant="h6" color="inherit" display="block">Clusters</Typography>
            <br/>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {clusterBoxes}
                </Grid>
            </div>
        </div>

    );
};
