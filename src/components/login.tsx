import * as React from 'react';
import {  MainState } from '../store/state';
import { observer, inject } from 'mobx-react';
import { RegisterComponent } from './register';
import { User } from '../store/models/user';
import TextField from 'material-ui/TextField';
import { SubmitButton } from './util/submit-button';
import { SmallErrorDisplay } from './util/small-error-display';
import Paper from 'material-ui/Paper';
import { Redirect } from 'react-router-dom';

const logo = require('../assets/logo.png');

@inject('mainState')
@observer
export class LoginComponent extends React.Component<{ mainState: MainState }, {}> {
    containerStyle = {
        width: '370px',
        maxWidth: '95vw',
        minHeight: '400px',
        margin: '20px auto',
        textAlign: 'center'
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
        // Jos huomataan että ollaan jo kirjauduttu, ohjataan samantien dashboardiin.
        if (this.props.mainState.authState.token !== '') {
            return ( <Redirect to="/" push={true} /> );
        }
        return (
            <div style={{width: '100%'}}>
                <div style={this.containerStyle}>
                    <Paper style={this.paperStyles} rounded={true} zDepth={2}>
                        <img style={{width: '100%'}} src={logo} />
                        <h4>Log in</h4>
                        <SmallErrorDisplay error={this.props.mainState.uiState.loginError} />
                        <i className="fa fa-user" aria-hidden="true"/>
                        <TextField style={this.textFieldStyle} id="username" type="text" hintText="Username" defaultValue="testeriija" />
                        <br />
                        <i className="fa fa-lock" aria-hidden="true" />
                        <TextField  style={this.textFieldStyle} id="password" type="password" hintText="Password" defaultValue="testaaja"/>
                        <br /><br />
                        <SubmitButton loading={this.props.mainState.uiState.loginLoading} label="Log In" onTouchTap={this.login} /><br /><br />
                        <a style={{textDecoration: 'none'}} href="#" onClick={this.forgotPw} >Forgot password?</a>
                    </Paper>
                </div>
                <div style={this.containerStyle}>
                    <RegisterComponent mainState={this.props.mainState} />
                </div>
            </div>
        );
    }

    forgotPw = () => {
        alert('Too bad :(');
    }

    createUser = (asd: any) => {
        let user = asd as User;
        this.props.mainState.userState.createUser(user);
    }

    login = () => {
        let username: string =  (document.getElementById('username') as HTMLInputElement).value;
        let password: string =  (document.getElementById('password') as HTMLInputElement).value;
        if (username && password) {
            this.props.mainState.authState.logIn(username, password);
        }
    }

}