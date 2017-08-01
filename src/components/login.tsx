import * as React from "react";
import { AppState } from "../store/state";
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';

@inject('appState')
@observer
export class LoginComponent extends React.Component<{ appState: AppState }, {}> {
    render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <button onClick={this.props.appState.logIn}>
                    Log in
                </button>
                <DevTools />
            </div>
        )
    }

    onReset = () => {
        this.props.appState.resetTimer();
    }
}