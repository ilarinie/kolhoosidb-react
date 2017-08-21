import * as React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { User } from '../../../store/models/user';
import { RaisedButton, Card, CardActions, CardText, CardHeader } from 'material-ui';

export class ProfileForm extends React.Component<{user: User, handleSubmit: any, handleChange: any, handlePwChange: any}, {}> {

    render () {
        return (
            <div>
                <Card style={{maxWidth: '400px'}}>
                    <CardHeader
                        title="Edit Profile"
                    />
                    <CardText>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                value={this.props.user.name}
                                floatingLabelText="Display name"
                            /><br />
                            <TextValidator
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={this.props.user.email}
                                floatingLabelText="Email address"
                            /><br />
                            <RaisedButton type="submit" label="Save changes" />
                        </ValidatorForm>
                    </CardText>
                </Card>
                <Card style={{maxWidth: '400px'}}>
                    <CardHeader
                        title="Change password"
                    />
                    <ValidatorForm onSubmit={this.handlePwChange} >
                        <CardText>
                        <TextValidator
                            type="password"
                            name="password"
                            id="pw"
                            floatingLabelText="Password"
                        /><br />
                        <TextValidator
                            type="password"
                            name="password_confirmation"
                            id="pwConf"
                            floatingLabelText="Password confirmation"
                        /><br />
                        </CardText>
                        <CardActions>
                        <RaisedButton label="Change password" type="submit" />
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