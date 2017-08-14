import * as React from 'react';
import { MainState } from '../../store/state';
import { inject, observer } from 'mobx-react';
import createBrowserHistory from '../../history';
import { TasksComponent } from './tasks';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { PurchasesComponent } from './purchases';
import { Commune } from '../../store/models/commune';
import { AppBarComponent } from './app-bar/app-bar';
import { Communelist } from './communelist/communelist';
import { CommuneSelectedRoute } from '../../App';
import DevTools from 'mobx-react-devtools';
import KolhoosiSnackBar from '../util/kolhoosi-snackbar';
import { AddUserComponent } from './add-user';

@inject('mainState')
@observer
export class Dashboard extends React.Component<{ mainState: MainState }, {}> {

    render() {
        return (
            <div className="dashboard">
                <DevTools />
                <AppBarComponent mainState={this.props.mainState} />
                <div className="content">
                    <Switch>
                        <CommuneSelectedRoute exact={true} path="/" component={TasksComponent} />
                        <CommuneSelectedRoute path="/purchases" component={PurchasesComponent} />
                        <CommuneSelectedRoute path="/adduser" component={AddUserComponent} />
                        <Route path="/communelist" component={Communelist} />
                    </Switch>
                </div>
                <KolhoosiSnackBar mainState={this.props.mainState} />
            </div>
        );
    }

    deselectCommune = () => {
        this.props.mainState.communeState.communeSelected = false;
        createBrowserHistory.push('/communelist');
    }

    logOut = () => {
        this.props.mainState.authState.logOut();
    }
}
