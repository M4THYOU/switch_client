import React, {FC, useEffect, useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import {ICluster} from "../../utils/interfaces";
import {getClusters} from "../../services/api/cluster";
import {LoadingSpinner} from "../../components/ui/LoadingSpinner";
import {activateThing} from "../../services/api/switch";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const DashboardNewThing: FC = () => {
    const classes = useStyles();
    const [thingName, setThingName] = useState('');
    const [thingKey, setThingKey] = useState('');
    const [clusterGroupId, setClusterGroupId] = useState('');
    const [clusters, setClusters] = useState<Array<ICluster>>([]);
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        getClusters().then(res => {
            const clusts: Array<ICluster> = res.clusters;
            setClusters(clusts);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    const manuallySetClusterId = (e: any) => {
        const groupId = e.target.value;
        setClusterGroupId(groupId);
    }

    const addClick = (e: any) => {
        e.preventDefault();
        if (!thingName) {
            alert('Please enter the thing\'s id/name.');
            return;
        } else if (!thingKey) {
            alert('Please enter the thing\'s key.');
            return;
        } else if (clusterGroupId === '') {
            alert('Please select a cluster to add the thing to.');
            return;
        }

        const payload = {
            name: thingName,
            key: thingKey,
            cluster_group_id: clusterGroupId
        }
        setIsLoading(true);
        activateThing(payload).then(res => {
            setIsLoading(false);
            if (!!res) {
                setThingName('');
                setThingKey('');
                setClusterGroupId('');
            }
        }).catch(e => {
            console.error(e);
            setIsLoading(false);
        });
    };

    function renderClusterItems() {
        return clusters.map((cluster: ICluster) => {
            return <MenuItem key={cluster.cluster_group_id} value={cluster.cluster_group_id}>{cluster.name}</MenuItem>
        });
    }
    const clusterItems = useMemo(() => renderClusterItems(), [clusters]);

    return (
        <React.Fragment>
            <LoadingSpinner isShowing={isLoading}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="thingName"
                        label="Thing Name"
                        fullWidth
                        autoComplete="thing-name"
                        onChange={(e) => setThingName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="thingKey"
                        label="Secret Key"
                        type="password"
                        fullWidth
                        autoComplete="thingKey"
                        onChange={(e) => setThingKey(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Cluster</InputLabel>
                        <Select
                            value={clusterGroupId}
                            onChange={manuallySetClusterId}
                            // onChange={(e) => setClusterId(e.target.value)}
                        >
                            { clusterItems }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={9} sm={4}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={addClick}
                    >
                        Add Thing
                    </Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
};
