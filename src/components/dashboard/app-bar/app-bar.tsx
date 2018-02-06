import * as React from 'react';
import { MainState } from '../../../store/state';
import { AppBar, IconButton, Typography, ListItemIcon, ListItemText } from 'material-ui';
import { Drawer, MenuItem, Divider, WithStyles } from 'material-ui';
import KolhoosiNavItem from './kolhoosi-nav-item';
import createBrowserHistory from '../../../history';
import { observer } from 'mobx-react';
import { FaCheck, FaDashboard, FaStarO, FaSignOut, FaTasks, FaLock, FaUser, FaEur } from 'react-icons/lib/fa';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { IconTitle } from '../../util/icon-title';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import { MdMenu, MdAccountCircle } from 'react-icons/lib/md';
import ListSubheader from 'material-ui/List/ListSubheader';
const logo = require('../../../assets/logo.png');

class AppBarComponent extends React.Component<{ mainState: MainState } & WithStyles, { docked: boolean, mobile: boolean, drawerOpen: any }> {

    constructor(props: any) {
        super(props);
        this.state = {
            drawerOpen: false,
            docked: false,
            mobile: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    render() {
        let communeName: string;
        if (!this.props.mainState.communeState.communeSelected) {
            communeName = 'Your communes';
        } else {
            communeName = this.props.mainState.communeState.selectedCommune.name;
        }
        let adminMenuItems: any = null;
        if (this.props.mainState.communeState.communeSelected && this.props.mainState.communeState.selectedCommune.current_user_admin) {
            adminMenuItems = (
                <div>
                    <Divider />
                    <ListSubheader>Admin tools</ListSubheader>
                    <KolhoosiNavItem
                        disabled={false}
                        path="/admin_panel"
                        text="Manage Commune"
                        onClick={this.handleClose}
                        icon={<FaLock />}
                        iconColor="lightgray"
                        className="admin-panel-link"
                    />
                </div>
            );
        }

        return (
            <div>
                <AppBar
                    position="static"
                >
                    <Toolbar>
                        <IconButton onClick={this.handleDrawerToggle} color="inherit" aria-label="Menu">
                            <MdMenu />
                        </IconButton>
                        <Typography type="title" color="inherit">
                            {communeName}
                        </Typography>
                        <IconButton style={{ position: 'absolute', right: 20 }} onClick={() => { createBrowserHistory.push('/profile'); }} color="inherit" aria-label="Profile" >
                            <MdAccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={this.handleDrawerToggle}
                    type={this.state.mobile ? 'temporary' : 'permanent'}
                    style={{
                        width: '250px'
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    elevation={1}
                >
                    <div
                        style={{
                            color: this.props.theme.palette.primary.contrastText,
                            height: '64px',
                            width: '100%',
                            background: this.props.theme.palette.primary.main,
                            textAlign: 'center'
                        }}
                    >
                        <h2>KolhoosiDB</h2>
                    </div>
                    <KolhoosiNavItem
                        disabled={!this.props.mainState.communeState.communeSelected}
                        path="/"
                        text="Dashboard"
                        onClick={this.handleClose}
                        icon={<FaDashboard />}
                        iconColor="lightgray"
                        className="dashboard-link"
                    />
                    <KolhoosiNavItem
                        disabled={!this.props.mainState.communeState.communeSelected}
                        path="/tasks"
                        text="Tasks"
                        onClick={this.handleClose}
                        icon={<FaTasks />}
                        iconColor="lightgray"
                        className="tasks-link"
                    />
                    <KolhoosiNavItem
                        disabled={!this.props.mainState.communeState.communeSelected}
                        path="/purchases"
                        text="Purchases"
                        onClick={this.handleClose}
                        iconColor="lightgray"
                        icon={<FaEur />}
                        className="purchases-link"
                    />
                    <Divider />
                    {adminMenuItems}
                    <Divider />
                    <KolhoosiNavItem
                        disabled={false}
                        path="/profile"
                        text="Profile"
                        onClick={this.handleClose}
                        icon={<FaUser />}
                        iconColor="lightgray"
                        className="profile-link"
                    />
                    <MenuItem
                        onClick={this.deselectCommune}
                        className="commune-switch-link"
                    >
                        <ListItemIcon className={this.props.classes.icon}>
                            <FaStarO />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset={true} primary="Switch Communes" />
                    </MenuItem>
                    <MenuItem
                        className="logout-link"
                        onClick={this.logout}
                    >
                        <ListItemIcon className={this.props.classes.icon}>
                            <FaSignOut />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset={true} primary="Log Out" />
                    </MenuItem>
                </Drawer>
            </div >
        );
    }

    toggleOpenDrawer = () => {
        if (!this.state.mobile) {
            return;
        }
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    setSmall = () => {
        this.setState({ drawerOpen: false, docked: false, mobile: true });
    }

    setLarge = () => {
        this.setState({ drawerOpen: true, docked: true, mobile: false });
    }

    // This will either make the drawer docked (desktop) or hidden (mobile)
    componentDidMount() {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
            this.setLarge();
        } else {
            this.setSmall();
        }
        mediaQuery.addListener((mq) => {
            if (mq.matches) {
                this.setLarge();
            } else {
                this.setSmall();
            }
        });
    }

    handleClose = () => {
        if (!this.state.docked) {
            this.setState({
                drawerOpen: false
            });
        }
    }

    handleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    deselectCommune = () => {
        this.handleClose();
        this.props.mainState.communeState.communeSelected = false;
        createBrowserHistory.push('/communelist');
    }

    logout = () => {
        this.handleClose();
        this.props.mainState.authState.logOut();
    }
}

export default compose<{ mainState: MainState }, any>(
    decorate,
    style,
    observer,
)(AppBarComponent);