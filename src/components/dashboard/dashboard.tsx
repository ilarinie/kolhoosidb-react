import * as React from 'react';
import { MainState, mainState } from '../../store/state';
import { inject, observer } from 'mobx-react';
import createBrowserHistory from '../../history';
import { TasksComponent } from './tasks/tasks';
import { Route, Switch } from 'react-router-dom';
import { PurchasesComponent } from './purchases/purchases';
import { AppBarComponent } from './app-bar/app-bar';
import { Communelist } from './communelist/communelist';
import { CommuneSelectedRoute } from '../../App';
import DevTools from 'mobx-react-devtools';
import KolhoosiSnackBar from '../util/kolhoosi-snackbar';
import { ProfileComponent } from './profile/profile';
import { AdminPanel } from './admin-panel/admin-panel';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { XpScroller } from '../util/xp-scroller';
import { AnimatedSwitch } from 'react-router-transition';

@inject('mainState')
@observer
export class Dashboard extends React.Component<{ mainState: MainState }, {}> {

    render() {
        return (
            <div className="dashboard">
                <AppBarComponent mainState={this.props.mainState} />
                <div className="content">
                    <AnimatedSwitch
                        key={location.pathname}
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                        runOnMount={true}
                    >
                        <CommuneSelectedRoute exact={true} path="/" component={DashboardComponent} />
                        <CommuneSelectedRoute path="/tasks" component={TasksComponent} />
                        <CommuneSelectedRoute path="/purchases" component={PurchasesComponent} />
                        <CommuneSelectedRoute path="/admin_panel" component={AdminPanel} />
                        <Route
                            path="/communelist"
                            component={Communelist}
                        />
                        <Route path="/profile" component={ProfileComponent} />
                    </AnimatedSwitch>
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
