import React, {FC} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {IThing} from "../../utils/interfaces";
import {Title} from "./dashboard/Title";

function preventDefault(e: any) {
    e.preventDefault();
}
const useStyles = makeStyles({
    root: {
        flex: 1,
    },
});

export const Thing: FC<{thing: IThing}> = ({ thing }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{thing.name}</Title>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View
                </Link>
            </div>
        </React.Fragment>
    );
}
