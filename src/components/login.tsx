import * as React from 'react';
import { MainState, mainState } from '../store/state';
import { observer, inject } from 'mobx-react';
import { decorate, style } from '../theme';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui/styles';
import RegisterComponent from './register';
import { User } from '../store/models/user';
import { TextField, Paper } from 'material-ui';
import SubmitButton from './util/submit-button';
import { SmallErrorDisplay } from './util/small-error-display';
import { Redirect } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/lib/fa';

const logo = require('../assets/logo.png');

/**
 * Grid properties.
 */
export interface LoginComponentProps {
    mainState: MainState;
}

class LoginComponent extends React.Component<LoginComponentProps & WithStyles, {}> {
    containerStyle = {
        width: '370px',
        maxWidth: '95vw',
        minHeight: '525px',
        margin: '20px auto',
        textAlign: 'center'
    };

    paperStyles = {
        height: '500px',
        color: 'gray'
    };

    innerContainer = {
        background: 'rgba(0%, 0%, 0%, 71.8%)',
        color: 'white',
        height: '300px',
        width: '300px',
        maxWidth: '95vw'
    };

    logoStyle = {
        height: '100px',
        background: 'rgb(100%, 0%, 18.3%)',
        borderRadius: '5px 5px 0 0'
    };

    textFieldStyle = {
        color: 'gray !important',
        paddingLeft: '10px',
        width: '150px'
    };

    componentDidMount() {
        if (process.env.REACT_APP_ENV !== 'production' && process.env.REACT_APP_ENV !== 'integration') {
            this.submitLogin('testaaja1', 'testaaja');
        }
    }

    render() {

        // Jos huomataan että ollaan jo kirjauduttu, ohjataan samantien dashboardiin.
        if (this.props.mainState.authState.token !== '') {
            return (<Redirect to="/" push={true} />);
        }
        return (
            <div>
                <div style={this.containerStyle}>
                    <Paper style={this.paperStyles}>
                        <img style={{ width: '100%' }} src={logo} />
                        <h4>Log in</h4>
                        <form onSubmit={this.login}>
                            <div className="fieldContainer">
                                <FaUser />
                                <TextField
                                    style={this.textFieldStyle}
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                // errorText={this.props.mainState.uiState.loginError.message}
                                />
                            </div>
                            <div className="fieldContainer">
                                <FaLock />
                                <TextField style={this.textFieldStyle} id="password" type="password" placeholder="Password" />
                            </div>
                            <br /><br />
                            <SubmitButton
                                className="login-button"
                                type="submit"
                                loading={this.props.mainState.uiState.loginLoading}
                                label="Log In"
                                onClick={this.login}
                            /><br /><br />
                        </form>
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

    login = (event: any) => {
        event.preventDefault();
        let username: string = (document.getElementById('username') as HTMLInputElement).value;
        let password: string = (document.getElementById('password') as HTMLInputElement).value;
        if (username && password) {
            this.submitLogin(username, password);
        }
    }

    submitLogin = (username: string, password: string) => {
        this.props.mainState.authState.logIn(username, password);
    }

}

export default compose<LoginComponentProps & WithStyles, any>(
    decorate,
    style,
    inject('mainState'),
    observer
)(LoginComponent);