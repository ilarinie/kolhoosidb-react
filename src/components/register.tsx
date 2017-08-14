import * as React from 'react';
import { KolhoosiTextField } from './util/kolhoosi-text-field';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import { MainState } from '../store/state';
import { User } from '../store/models/user';
import TextField from 'material-ui/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { inject, observer } from 'mobx-react';
import { SubmitButton } from './util/submit-button';
import { SmallErrorDisplay } from './util/small-error-display';
import { LoadingScreen } from './util/loading-screen';
import { Card, CardHeader, CardText } from 'material-ui/Card';

@inject('mainState')
@observer
export class RegisterComponent extends React.Component<{mainState: MainState}, {user: any}> {
    
    constructor(props: any) {
        super(props);
        let user: any = {};
        user.username = '';
        user.name = '';
        user.password = '';
        user.password_confirmation = '';
        user.email = '';

        this.state = {
            user:  user,
        };
        this.handleChange.bind(this);
    }

    render() {
        const { user } = this.state;       
        return (
            <Card>
                <CardHeader
                    title="Register"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                <SmallErrorDisplay error={this.props.mainState.uiState.registerError} />
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.showError(errors)}
                >
                    <TextValidator
                        floatingLabelText="Username"
                        onChange={this.handleChange}
                        name="username"
                        type="text"
                        validators={['required']}
                        errorMessages={['Username is required']}
                        value={user.username}
                    /><br />
                    <TextValidator
                        floatingLabelText="Name"
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        validators={['required']}
                        errorMessages={['Name is required']}
                        value={user.name}
                    /><br />
                    <TextValidator
                        floatingLabelText="Email"
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        validators={['required']}
                        errorMessages={['Email is required']}
                        value={user.email}
                    /><br />
                    <TextValidator
                        floatingLabelText="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        validators={['required']}
                        errorMessages={['Password is required']}
                        value={user.password}
                    /><br />
                    <TextValidator
                        floatingLabelText="Password Confirmation"
                        onChange={this.handleChange}
                        name="password_confirmation"
                        type="password"
                        validators={['required']}
                        errorMessages={['Password confirmation is required']}
                        value={user.password_confirmation}
                    /><br />
                    <SubmitButton loading={this.props.mainState.uiState.registerLoading} label="Sign up" type="submit" />
                </ValidatorForm>
                </CardText>
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