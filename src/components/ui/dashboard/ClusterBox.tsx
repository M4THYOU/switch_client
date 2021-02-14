import React, {FC} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Title} from './Title';
import {ICluster} from "../../../utils/interfaces";

function preventDefault(e: any) {
    e.preventDefault();
}
const useStyles = makeStyles({
    root: {
        flex: 1,
    },
});

export const ClusterBox: FC<{cluster: ICluster}> = ({ cluster }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{cluster.name}</Title>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View
                </Link>
            </div>
        </React.Fragment>
    );
}
