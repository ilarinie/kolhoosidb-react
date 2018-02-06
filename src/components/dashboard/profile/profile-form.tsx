import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { User } from '../../../store/models/user';
import { Button, Card, CardActions, CardContent, CardHeader } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import { decorate, style } from '../../../theme';
import { compose } from 'recompose';

class ProfileForm extends React.Component<{ user: User, handleSubmit: any, handleChange: any, handlePwChange: any } & WithStyles, {}> {

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title="Edit Profile"
                    />
                    <CardContent>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                value={this.props.user.name}
                                helperText="Display name"
                            /><br />
                            <TextValidator
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={this.props.user.email}
                                helperText="Email address"
                            /><br />
                            <Button raised={true} type="submit" >Save changes</Button>
                        </ValidatorForm>
                    </CardContent>
                </Card>
                <hr />
                <Card>
                    <CardHeader
                        title="Change password"
                    />
                    <ValidatorForm onSubmit={this.handlePwChange} >
                        <CardContent>
                            <TextValidator
                                type="password"
                                name="password"
                                id="pw"
                                placeholder="Password"
                                validators={['required', 'matchRegexp:^.{8,}']}
                                errorMessages={['Password must be at least 8 characters long.']}
                            /><br />
                            <TextValidator
                                type="password"
                                name="password_confirmation"
                                id="pwConf"
                                placeholder="Password confirmation"
                            /><br />
                        </CardContent>
                        <CardActions>
                            <Button raised={true} type="submit" >Change password</Button>
                        </CardActions>
                    </ValidatorForm>
                </Card>

            </div>
        );
    }

    handleChange = (event: any) => {
        this.props.handleChange(event);
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.props.user);
    }

    handlePwChange = () => {
        let password: string = (document.getElementById('pw') as HTMLInputElement).value;
        let password_confirmation: string = (document.getElementById('pwConf') as HTMLInputElement).value;
        if (password && password_confirmation) {
            this.props.handlePwChange(password, password_confirmation);
            (document.getElementById('pw') as HTMLInputElement).value = '';
            (document.getElementById('pwConf') as HTMLInputElement).value = '';
        }
    }
}

export default compose<any & WithStyles, any>(
    decorate,
    style,
)(ProfileForm);