import * as React from 'react';
import { AppState } from '../../store/state';
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

@inject('appState')
@observer
export class Dashboard extends React.Component<{ appState: AppState }, {}> {

    render() {
        return (
            <div>
                <DevTools />
                <AppBarComponent appState={this.props.appState} />
                <div className="content">
                    <Switch>
                        <CommuneSelectedRoute exact={true} path="/" component={TasksComponent} />
                        <CommuneSelectedRoute path="/purchases" component={PurchasesComponent} />
                        <Route path="/communelist" component={Communelist} />
                    </Switch>
                </div>
            </div>
        );
    }

    deselectCommune = () => {
        this.props.appState.communeSelected = false;
        createBrowserHistory.push('/communelist');
    }

    logOut = () => {
        this.props.appState.logOut();
    }
}
