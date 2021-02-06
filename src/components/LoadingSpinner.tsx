import React, {FC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            zIndex: 9999,
            textAlign: 'center'
        },
        inside: {
            margin: 'auto',
            position: 'absolute',
            top: 0, left: 0,
            bottom: 0,
            right: 0
        }
    }),
);

export const LoadingSpinner: FC<{ isShowing: boolean }> = ({ isShowing }) => {
    const classes = useStyles();

    if (isShowing) {
        return (
            <div className={classes.root}>
                <CircularProgress className={classes.inside} />
            </div>
        );
    } else {
        return (<></>);
    }
}
