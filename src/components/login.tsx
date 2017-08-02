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
                <div className="input-field">
                    <input id="username" type="text" placeholder="Username" />
                </div>
                <div className="input-field">
                    <input id="password" type="password" placeholder="Password" />
                </div>
                <div className="input-field">
                    <button onClick={this.login}> Log In </button>
                </div>
                <DevTools />
            </div>
        )
    }

    login = () => {
        let username: string =  (document.getElementById('username') as HTMLInputElement).value;
        let password: string =  (document.getElementById('password') as HTMLInputElement).value;
        if (username && password) {
            this.props.appState.logIn(username, password);
        }
    }


}