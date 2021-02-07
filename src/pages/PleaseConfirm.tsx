import React, {FC} from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Copyright} from "../components/ui/Copyright";
import {mainStyles} from "../styles/main";

export const PleaseConfirm: FC = () => {
    const classes = mainStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Thank you for signing up.
                </Typography>
                <Typography>
                    Click the link in the email we sent you to confirm your email address.
                </Typography>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
