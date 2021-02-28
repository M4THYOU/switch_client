import React, {FC, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {IFamily} from "../../utils/interfaces";
import {LoadingSpinner} from "../../components/ui/LoadingSpinner";
import {sendInvite, validateEmail} from "../../services/api/auth";
import {getPrimaryFamily} from "../../services/api/family";

export const DashboardInvite: FC = () => {
    const [email, setEmail] = useState('');
    const [family, setFamily] = useState<IFamily | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPrimaryFamily().then(res => {
            const familyRes: IFamily = res.family;
            setFamily(familyRes);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    const addClick = (e: any) => {
        e.preventDefault();
        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email.');
            return;
        } else if (!family) {
            alert('Apparently you have no family...');
            return;
        }

        setIsLoading(true);
        sendInvite(email, family.family_group_id).then(res => {
            setIsLoading(false);
            if (!!res) {
                setEmail('');
            }
        }).catch(e => {
            console.error(e);
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <LoadingSpinner isShowing={isLoading}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="email"
                        id="email"
                        label="Email"
                        fullWidth
                        autoComplete="thing-name"
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                        Invite
                    </Button>
                </Grid>

            </Grid>
        </React.Fragment>
    );
};
