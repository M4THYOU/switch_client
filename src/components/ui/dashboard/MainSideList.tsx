import React, {FC, useMemo} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import GroupWork from "@material-ui/icons/GroupWork";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import List from "@material-ui/core/List";
import {Collapse} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {DashboardPage} from "../../../utils/enums";
import {createFamily} from "../../../services/api/family";
import {IFamily} from "../../../utils/interfaces";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

export const MainSideList: FC<{
    handleLinkClick: (page: DashboardPage) => void,
    handleFamilyClick: (family: IFamily) => void,
    handleNewFamily: () => void,
    families: Array<IFamily>
}> = ({ handleLinkClick, handleFamilyClick, handleNewFamily, families }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    function renderFamilies() {
        return families.map(fam => {
            return (
                <ListItem button className={classes.nested} divider={true} key={fam.id} onClick={() => handleFamilyClick(fam)}>
                    <ListItemText primary={fam.name} />
                </ListItem>
            );
        });
    }
    const familiesList = useMemo(() => renderFamilies(), [families]);

    return (
        <List>
            <div>
                <ListItem button onClick={() => handleLinkClick(DashboardPage.MAIN)}>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <GroupWork/>
                    </ListItemIcon>
                    <ListItemText primary="Families"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { familiesList }
                        <ListItem button className={classes.nested} divider={true} onClick={handleNewFamily}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Family" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={() => handleLinkClick(DashboardPage.NEW_THING)}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="New Thing"/>
                </ListItem>

                {/*<ListItem button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <PeopleIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Customers"/>*/}
                {/*</ListItem>*/}
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <BarChartIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Reports"/>*/}
                {/*</ListItem>*/}
                {/*<ListItem button>*/}
                {/*    <ListItemIcon>*/}
                {/*        <LayersIcon/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary="Integrations"/>*/}
                {/*</ListItem>*/}
            </div>
        </List>
    );
};
