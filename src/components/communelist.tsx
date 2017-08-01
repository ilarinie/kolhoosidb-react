import * as React from "react";
import { AppState } from "../store/state";
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export class Communelist extends React.Component<{ appState: AppState }, {}> {
    render() {
        let communes = this.props.appState.communes.map((commune, index) => 
            <li>{commune} <CommuneSelector value={index} appState={this.props.appState} /></li>
        );
        return (
            <div>
                <button onClick={this.logout}>
                    Log out
                </button>
                <ul>
                    {communes}
                </ul>
                Selected:
                <span>{this.props.appState.selectedCommune}</span>
            </div>
        )
    }

    selectCommune = (id: number) => {
        this.props.appState.selectCommune(id);
    }

    logout = () => {
        this.props.appState.logOut();
    }
}

class CommuneSelector extends React.Component<{value: number, appState: AppState}, {}> {
    render() {
        return (
            <button onClick={this.selectCommune}> Select </button>
        )
    }

    selectCommune = () => {
        this.props.appState.selectCommune(this.props.value);
    }
}