import * as React from 'react';
import { MainState } from '../../../store/state';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { KolhoosiNavItem } from './kolhoosi-nav-item';
import createBrowserHistory from '../../../history';
import { Subheader, FontIcon } from 'material-ui';
import { observer } from 'mobx-react';
import { FaCheck, FaDashboard, FaStarO, FaSignOut, FaTasks, FaLock, FaUser, FaEur } from 'react-icons/lib/fa';
const logo = require('../../../assets/logo.png');
@observer
export class AppBarComponent extends React.Component<{ mainState: MainState }, { docked: boolean, mobile: boolean, drawerOpen: any }> {

    constructor() {
        super();
        this.state = {
            drawerOpen: false,
            docked: false,
            mobile: false
        };
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
                    <Subheader>Admin tools</Subheader>
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
                    title={communeName}
                    onLeftIconButtonTouchTap={this.toggleOpenDrawer}
                    showMenuIconButton={this.state.mobile}
                />
                <Drawer zDepth={1} open={this.state.drawerOpen} docked={this.state.docked} width={250} onRequestChange={(open) => this.setState({ drawerOpen: open })}>
                    <img src={logo} style={{ height: '64px', width: '100%' }} />
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
                        leftIcon={<FaStarO />}
                        primaryText="Switch Communes"
                        onClick={this.deselectCommune}
                        className="commune-switch-link"
                    />
                    <MenuItem
                        leftIcon={<FaSignOut />}
                        primaryText="Log Out"
                        className="logout-link"
                        onClick={this.logout}
                    />
                </Drawer>
            </div>
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