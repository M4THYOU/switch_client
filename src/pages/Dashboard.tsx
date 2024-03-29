import React, {FC, useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {MainSideList} from '../components/ui/dashboard/MainSideList';
import {Copyright} from "../components/ui/Copyright";
import {useProvideAuth} from "../hooks/use-auth";
import {DashboardPage} from "../utils/enums";
import {DashboardMain} from "./dashboard/DashboardMain";
import {DashboardNewFamily} from "./dashboard/DashboardNewFamily";
import {DashboardFamily} from "./dashboard/DashboardFamily";
import {createFamily, getFamilies} from "../services/api/family";
import {ICluster, IFamily} from "../utils/interfaces";
import {DashboardCluster} from "./dashboard/DashboardCluster";
import {DashboardNewThing} from "./dashboard/DashboardNewThing";
import {DashboardInvite} from "./dashboard/DashboardInvite";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export const Dashboard: FC = () => {
    useProvideAuth();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [dashboardPage, setDashboardPage] = React.useState(DashboardPage.MAIN);
    const [families, setFamilies] = React.useState<Array<IFamily>>([]);
    const [selectedFamily, setSelectedFamily] = React.useState<IFamily | null>(null);
    const [selectedCluster, setSelectedCluster] = React.useState<ICluster | null>(null);

    useEffect(() => {
        getFamilies().then(res => {
            const families: Array<IFamily> = res.families;
            setFamilies(families);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    const handleNewFamily = () => {
        createFamily().then(res => {
            const family: IFamily = res.family;
            const fams = families.slice();
            fams.push(family);
            setFamilies(fams);
        }).catch(e => {
            console.error(e);
        });
    };
    const handleFamilyClick = (family: IFamily) => {
        setSelectedFamily(family);
        setDashboardPage(DashboardPage.FAMILY);
    };
    const handleClusterClick = (cluster: ICluster) => {
        setSelectedCluster(cluster);
        setDashboardPage(DashboardPage.CLUSTER);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    function getPageTitle() {
        switch (dashboardPage) {
            case DashboardPage.MAIN:
                return 'Dashboard';
            case DashboardPage.NEW_FAMILY:
                return 'Add a new Family';
            case DashboardPage.FAMILY:
                return !!selectedFamily ? selectedFamily.name : '';
            case DashboardPage.CLUSTER:
                const familyS = !!selectedFamily ? (selectedFamily.name + ' > ') : '';
                const clusterS = !!selectedCluster ? selectedCluster.name : '';
                return familyS + clusterS;
            case DashboardPage.NEW_THING:
                return 'Add a new Thing';
            case DashboardPage.INVITE_USER:
                return 'Invite a new member to your Family';
        }
    }
    function renderPage() {
        switch (dashboardPage) {
            case DashboardPage.MAIN:
                return <DashboardMain />;
            case DashboardPage.NEW_FAMILY:
                return <DashboardNewFamily />;
            case DashboardPage.FAMILY:
                return !!selectedFamily ? <DashboardFamily family={selectedFamily} handleClusterClick={handleClusterClick} /> : <></>;
            case DashboardPage.CLUSTER:
                return !!selectedCluster ? <DashboardCluster cluster={selectedCluster} /> : <></>;
            case DashboardPage.NEW_THING:
                return <DashboardNewThing />;
            case DashboardPage.INVITE_USER:
                return <DashboardInvite />;
        }
    }
    const curPage = useMemo(() => renderPage(), [dashboardPage, selectedFamily]);
    const curPageTitle = useMemo(() => getPageTitle(), [dashboardPage, selectedFamily]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        { curPageTitle }
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />

                <MainSideList handleLinkClick={setDashboardPage}
                              handleFamilyClick={handleFamilyClick}
                              handleNewFamily={handleNewFamily}
                              families={families}
                />

                {/*<Divider />*/}
                {/*<SecondarySideList />*/}

            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    { curPage }
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
