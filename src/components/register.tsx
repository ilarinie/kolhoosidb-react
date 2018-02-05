import * as React from 'react';
import { MainState } from '../store/state';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { inject, observer } from 'mobx-react';
import SubmitButton from './util/submit-button';
import { SmallErrorDisplay } from './util/small-error-display';
import { Card, CardHeader, CardContent } from 'material-ui';
import { compose } from 'recompose';
import { decorate, style } from '../theme';
import { WithStyles } from 'material-ui';

interface RegisterComponentProps {
    mainState: MainState;
}

class RegisterComponent extends React.Component<RegisterComponentProps & WithStyles, { user: any }> {

    constructor(props: any) {
        super(props);
        let user: any = {};
        user.username = '';
        user.name = '';
        user.password = '';
        user.password_confirmation = '';
        user.email = '';

        this.state = {
            user: user,
        };
        this.handleChange.bind(this);
    }

    render() {
        const { user } = this.state;
        return (
            <Card>
                <CardHeader
                    className="register-form-button"
                    title="Register"
                />
                <CardContent>
                    <SmallErrorDisplay error={this.props.mainState.uiState.registerError} />
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                        onError={errors => this.showError(errors)}
                    >
                        <TextValidator
                            placeholder="Username"
                            onChange={this.handleChange}
                            name="username"
                            type="text"
                            validators={['required']}
                            errorMessages={['Username is required']}
                            value={user.username}
                        /><br />
                        <TextValidator
                            placeholder="Name"
                            onChange={this.handleChange}
                            name="name"
                            type="text"
                            validators={['required']}
                            errorMessages={['Name is required']}
                            value={user.name}
                        /><br />
                        <TextValidator
                            placeholder="Email"
                            onChange={this.handleChange}
                            name="email"
                            type="email"
                            validators={['required']}
                            errorMessages={['Email is required']}
                            value={user.email}
                        /><br />
                        <TextValidator
                            placeholder="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            validators={['required']}
                            errorMessages={['Password is required']}
                            value={user.password}
                        /><br />
                        <TextValidator
                            placeholder="Password Confirmation"
                            onChange={this.handleChange}
                            name="password_confirmation"
                            type="password"
                            validators={['required']}
                            errorMessages={['Password confirmation is required']}
                            value={user.password_confirmation}
                        /><br />
                        <SubmitButton className="register-button" loading={this.props.mainState.uiState.registerLoading} label="Sign up" type="submit">
                            <span id="registerbutton" />
                        </SubmitButton>
                    </ValidatorForm>
                </CardContent>
            </Card>
        );
    }

    handleChange = (event: any) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = () => {
        this.props.mainState.userState.createUser(this.state.user);
    }

    showError = (error: any) => {
        console.log(error);
    }

}

export default compose<RegisterComponentProps, any>(
    decorate,
    style,
    observer,
)(RegisterComponent);