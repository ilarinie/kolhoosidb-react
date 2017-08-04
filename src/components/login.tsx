import * as React from 'react';
import { AppState } from '../store/state';
import DevTools from 'mobx-react-devtools';
import { observer, inject } from 'mobx-react';
import { RegisterComponent } from './register';
import { KolhoosiTextField } from './util/kolhoosi-text-field';
import RaisedButton from 'material-ui/RaisedButton';
import { User } from '../store/models/user';
import TextField from 'material-ui/TextField';
import { SubmitButton } from './util/submit-button';

@inject('appState')
@observer
export class LoginComponent extends React.Component<{ appState: AppState }, {}> {
    containerStyle = {
        width: '90%',
        textAlign: 'center',
        padding: '30px'
    };

    render() {
        return (
            <div>
                <div style={this.containerStyle}>
                    <h1>Welcome to KolhoosiDb</h1>
                    <h4>Log in</h4>
                        <TextField id="username" type="text" hintText="Username" /> <br />
                        <TextField id="password" type="password" hintText="Password" /> <br />
                        <SubmitButton loading={this.props.appState.loginLoading} label="Log In" onTouchTap={this.login} /><br />
                        <div style={{color: 'red', marginTop: '10px'}}>{this.props.appState.loginErrorMessage}</div>
                        <DevTools />
                </div>
                <div style={this.containerStyle}>
                    <RegisterComponent appState={this.props.appState} />
                </div>
            </div>
        );
    }

    createUser = (asd: any) => {
        let user = asd as User;
        this.props.appState.createUser(user);
    }

    login = () => {
        let username: string =  (document.getElementById('username') as HTMLInputElement).value;
        let password: string =  (document.getElementById('password') as HTMLInputElement).value;
        if (username && password) {
            this.props.appState.logIn(username, password);
        }
    }

}