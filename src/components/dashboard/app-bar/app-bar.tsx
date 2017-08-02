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

export class AppBarComponent extends React.Component<{appState: AppState}, {drawerOpen: any}> {

    constructor() {
        super();
        this.state = {
            drawerOpen: false
        };
    }

    render() {
        let communeName: string;
        if (!this.props.appState.communeSelected) {
            communeName = 'Your communes';
        } else {
            communeName = this.props.appState.selectedCommune.name;
        }
        return (
            <div>
                <AppBar
                    title={communeName}
                    onLeftIconButtonTouchTap={this.handleDrawer}
                />
                <Drawer open={this.state.drawerOpen} docked={false} width={200} onRequestChange={(open) => this.setState({ drawerOpen: open })}>
                    <MenuItem disabled={true}>KolhoosiDB</MenuItem>
                    <Divider />
                    <KolhoosiNavItem disabled={!this.props.appState.communeSelected} path="/" text="Tasks" onTouchTap={this.handleClose} /> 
                    <KolhoosiNavItem disabled={!this.props.appState.communeSelected} path="/purchases" text="Purchases" onTouchTap={this.handleClose} />
                    <Divider />
                    <MenuItem onTouchTap={this.deselectCommune}>Switch communes</MenuItem>
                    <MenuItem onTouchTap={this.logout}>Log Out</MenuItem>
                </Drawer>
            </div>
        );
    }

    handleClose = () => {
        this.setState({
            drawerOpen: false
        });
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