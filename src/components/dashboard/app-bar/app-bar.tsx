import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { AppState } from '../../../store/state';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { KolhoosiNavItem } from './kolhoosi-nav-item';
import createBrowserHistory from '../../../history';

export class AppBarComponent extends React.Component<{appState: AppState}, {docked: boolean, mobile: boolean, drawerOpen: any}> {

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
        if (!this.props.appState.communeSelected) {
            communeName = 'Your communes';
        } else {
            communeName = this.props.appState.selectedCommune.name;
        }
        let adminMenuItems: any = null;
        if (this.props.appState.communeSelected && this.props.appState.selectedCommune.current_user_admin) {
            adminMenuItems = (
                <KolhoosiNavItem disabled={false} path="/adduser" text="Add users" onTouchTap={this.handleClose} />
            );
        }

        return (
            <div>
                <AppBar
                    title={communeName}
                    onLeftIconButtonTouchTap={this.toggleOpenDrawer}
                    showMenuIconButton={this.state.mobile}
                />
                <Drawer open={this.state.drawerOpen} docked={this.state.docked} width={200} onRequestChange={(open) => this.setState({ drawerOpen: open })}>
                    <MenuItem disabled={true}>KolhoosiDB</MenuItem>
                    <Divider />
                        <KolhoosiNavItem disabled={!this.props.appState.communeSelected} path="/" text="Tasks" onTouchTap={this.handleClose} /> 
                        <KolhoosiNavItem disabled={!this.props.appState.communeSelected} path="/purchases" text="Purchases" onTouchTap={this.handleClose} />
                    <Divider />
                        {adminMenuItems}
                    <Divider />
                        <MenuItem onTouchTap={this.deselectCommune}>Switch communes</MenuItem>
                        <MenuItem onTouchTap={this.logout}>Log Out</MenuItem>
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
        this.setState({drawerOpen: false, docked: false, mobile: true});
    }
    
    setLarge = () => {
        this.setState({drawerOpen: true, docked: true, mobile: false});
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
        this.props.appState.communeSelected = false;
        createBrowserHistory.push('/communelist');
    }

    logout = () => {
        this.handleClose();
        this.props.appState.logOut();
    }
}