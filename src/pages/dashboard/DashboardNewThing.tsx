import React, {FC, useEffect, useMemo, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import {ICluster} from "../../utils/interfaces";
import {getClusters} from "../../services/api/cluster";

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
    const [password, setPassword] = useState('');
    const [curClusterId, setCurClusterId] = useState('');
    const [clusters, setClusters] = useState<Array<ICluster>>([]);

    useEffect(() => {
        getClusters().then(res => {
            const clusts: Array<ICluster> = res.clusters;
            setClusters(clusts);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    const manuallySetClusterId = (e: any) => {
        const clusterId = e.target.value;
        setCurClusterId(clusterId);
        console.log(clusterId);
    }

    const addClick = (e: any) => {
        e.preventDefault();
        if (!thingName) {
            alert('Please enter the thing\'s id/name.');
            return;
        } else if (!password) {
            alert('Please enter the thing\'s password.');
            return;
        } else if (curClusterId === '') {
            alert('Please select a cluster to add the thing to.');
            return;
        }

        // setIsLoading(true);
        // login(email, password).then(res => {
        //     setIsLoading(false);
        //     if (!!res) {
        //         history.push(PATH_HOME);
        //     }
        // })
        console.log(thingName, password);
    };

    function renderClusterItems() {
        return clusters.map((cluster: ICluster) => {
            return <MenuItem key={cluster.id} value={cluster.id}>{cluster.name}</MenuItem>
        });
    }
    const clusterItems = useMemo(() => renderClusterItems(), [clusters]);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
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
                        id="thingPassword"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="thing-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Cluster</InputLabel>
                        <Select
                            value={curClusterId}
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
