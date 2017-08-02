import * as React from "react";
import { AppState } from "../store/state";
import { inject, observer } from 'mobx-react';
import createBrowserHistory from '../history';
import { TasksComponent } from "./tasks";
import {  Route, Link, Switch } from "react-router-dom";
import { PurchasesComponent } from "./purchases";
import {Commune} from "../store/models/commune";


@inject('appState')
@observer
export class Dashboard extends React.Component<{ appState: AppState }, {}> {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/'>Tasks</Link></li>
                    <li><Link to='/purchases'>Purchases</Link></li>
                </ul>
                <h4>Valittu kommuuni:</h4>
                <h5>{this.props.appState.selectedCommune}</h5>

                <button onClick={this.deselectCommune}>Valitse toinen kommuuni</button><br/>
                <button onClick={this.logOut}>Log Out</button>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={TasksComponent} />
                        <Route path="/purchases" component={PurchasesComponent} />
                    </Switch>
                </div>
            </div>
        )
    }

    deselectCommune = () => {
        this.props.appState.selectedCommune = undefined;
        createBrowserHistory.push('/communelist')
    }

    logOut = () => {
        this.props.appState.logOut();
    }
}