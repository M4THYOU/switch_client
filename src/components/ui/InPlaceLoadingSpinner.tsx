import React, {FC} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            height: 120
        },
        inside: {
            margin: 'auto',
        }
    }),
);

export const InPlaceLoadingSpinner: FC<{ isShowing: boolean }> = ({ isShowing }) => {
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
