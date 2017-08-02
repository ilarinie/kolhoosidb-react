import * as React from 'react';
import { KolhoosiTextField } from './util/kolhoosi-text-field';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import { AppState } from '../store/state';
import { User } from '../store/models/user';
import TextField from 'material-ui/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { inject, observer } from 'mobx-react';

@inject('appState')
@observer
export class RegisterComponent extends React.Component<{appState: AppState}, {user: any}> {
    
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
        if (this.props.appState.registerLoading) {
            return (
                <div>
                    Loading..
                </div>
            );
        }
        // let errors = this.props.appState.registerErrors.map((error, index) => 
        //      <li key={index}>{error}</li>
        // );
        
        return (
            <div>
                <h4>Sign up</h4>
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
                        type="text"
                        validators={['required']}
                        errorMessages={['Password is required']}
                        value={user.password}
                    /><br />
                    <TextValidator
                        floatingLabelText="Password Confirmation"
                        onChange={this.handleChange}
                        name="password_confirmation"
                        type="text"
                        validators={['required']}
                        errorMessages={['Password confirmation is required']}
                        value={user.password_confirmation}
                    /><br />
                    <RaisedButton label="Sign up" type="submit" />
                </ValidatorForm>
            </div>
        );
    }

    handleChange = (event: any) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    handleSubmit = () => {
        this.props.appState.createUser(this.state.user);
    }
    
    showError = (error: any) => {
        console.log(error);
    }

}

// return (
//     <div>
//         <h4>Sign up</h4>
//         <form id="registerform">
//             <fieldset>
//             <TextField 
//                 name="username"
//                 type="text"
//                 id="username"
//                 hintText="Username"

//             /> <br />
//             <TextField
//                 name="name"
//                 type="text"
//                 id="name"
//                 hintText="Display name"
//             /> <br/>
//             <TextField name="email" type="email" id="email" hintText="Email address" /> <br />
//             <TextField name="password" type="password" id="password" hintText="Password"/> <br />
//             <TextField name="password_confirmation" type="password" id="password_confirmation" hintText="Password confirmation"/> <br /> 
//             <RaisedButton label="Sign up"  />
//             </fieldset>
//         </form>
//     </div>
// );