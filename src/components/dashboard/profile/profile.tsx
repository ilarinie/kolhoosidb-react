import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { MainState } from '../../../store/state';
import { InvitationsList } from './invitations';
import { Invitation } from '../../../store/models/invitation';
import { User } from '../../../store/models/user';
import { ProfileForm } from './profile-form';

@inject('mainState')
@observer 
export class ProfileComponent extends React.Component<{mainState: MainState}, {user: User}> {
    containerStyle: any = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    };

constructor(props: any) {
    super(props);
    
    this.state = {
        user: this.props.mainState.userState.current_user
    };
}

render() {
    let invitations = (<b>No pending invitations</b>);
    if (this.props.mainState.userState.current_user.invitations.length !== 0) {
            invitations = (
                <InvitationsList accept={this.acceptInvitation} reject={this.rejectInvitation} invitations={this.props.mainState.userState.current_user.invitations} />
            );
        }
    return (
            <div className="full-size-component" style={this.containerStyle} >
                {invitations}
                <ProfileForm 
                    user={this.state.user}
                    handlePwChange={this.handlePwChange}
                    handleChange={this.handleFormChange}
                    handleSubmit={this.handleProfileSubmit}
                />
            </div>
        );
    }

acceptInvitation = (invitation: Invitation) => {
        this.props.mainState.userState.acceptInvitation(invitation);
    }

rejectInvitation = (invitation: Invitation) => {
        this.props.mainState.userState.rejectInvitation(invitation);       
    }

handleProfileSubmit = () => {
    this.props.mainState.userState.updateUser(this.state.user);
}

handleFormChange = (event: any) => {
    let updatedUser = this.state.user;
    updatedUser[event.target.name] = event.target.value;
    this.setState({user: updatedUser});
}

handlePwChange = (password: string, password_confirmation: string) => {
    this.props.mainState.userState.changePassword(password, password_confirmation);
}
        
}