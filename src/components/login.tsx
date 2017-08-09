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
import { SmallErrorDisplay } from './util/small-error-display';
import Paper from 'material-ui/Paper';

const logo = require('../assets/logo.png');

@inject('appState')
@observer
export class LoginComponent extends React.Component<{ appState: AppState }, {}> {
    containerStyle = {
        width: '398px',
        minHeight: '400px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '30px'
    };

    paperStyles = {
        height: '450px',
        color: 'gray'
    };

    innerContainer = {
        background: 'rgba(0%, 0%, 0%, 71.8%)',
        color: 'white',
        height: '300px',
        width: '300px'
    };

    logoStyle = {
        height: '100px',
        background: 'rgb(100%, 0%, 18.3%)',
        borderRadius: '5px 5px 0 0'
    };

    textFieldStyle = {
        color: 'gray !important',
        paddingLeft: '10px'
    };

    render() {
        return (
            <div style={{backgroud: '#ffe'}}>
                <div style={this.containerStyle}>
                    <Paper style={this.paperStyles} rounded={true} zDepth={2}>
                        <img src={logo} />
                        <h4>Log in</h4>
                        <SmallErrorDisplay error={this.props.appState.loginError} />
                        <i className="fa fa-user" aria-hidden="true"/> <TextField style={this.textFieldStyle} id="username" type="text" hintText="Username" value="testeriija" />
                        <br />
                        <i className="fa fa-lock" aria-hidden="true" /><TextField  style={this.textFieldStyle} id="password" type="password" hintText="Password" value="testaaja"/>
                        <br /><br />
                        <SubmitButton loading={this.props.appState.loginLoading} label="Log In" onTouchTap={this.login} /><br />
                    </Paper>
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