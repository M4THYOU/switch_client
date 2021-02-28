import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Copyright} from "../components/ui/Copyright";
import {confirmInvite} from "../services/api/auth";
import {mainStyles} from "../styles/main";
import {PATH_LOGIN, PATH_REGISTER} from "../services/routePaths";
import {LoadingSpinner} from "../components/ui/LoadingSpinner";
import {useHistory, useLocation} from "react-router";
import queryString from 'query-string';

export function AcceptInvite() {
    const classes = mainStyles();
    const [token, setToken] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [optIn, setOptIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        const params = queryString.parse(location.search);
        const tokenParam: string = (params['invitation_token'] || '') as string;
        if (!tokenParam) {
            history.push(PATH_REGISTER);
        }
        console.log(tokenParam);
        setToken(tokenParam);
    }, []);

    function handleSubmit(e: any) {
        e.preventDefault();
        if (!firstName) {
            alert('Please enter your first name.');
            return;
        } else if (!lastName) {
            alert('Please enter your last name.');
            return;
        } else if (!password) {
            alert('Please enter your password.');
            return;
        }
        setIsLoading(true);
        confirmInvite(firstName, lastName, password, token).then(res => {
            setIsLoading(false);
            if (!!res) {
                history.push(PATH_LOGIN);
            }
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <LoadingSpinner isShowing={isLoading}/>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Accept your Invitation
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e) => setOptIn(e.target.checked)} />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Accept
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
