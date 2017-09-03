import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { MainState } from '../../../store/state';
import { InvitationsList } from './invitations';
import { Invitation } from '../../../store/models/invitation';
import { User } from '../../../store/models/user';
import { ProfileForm } from './profile-form';
import { FullWidthCardWrapper } from '../../util/full-width-card-wrapper';
import { SetDefaultCommuneComponent } from './set-commune';

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

    return (
            <div className="full-size-component" style={this.containerStyle} >
            <FullWidthCardWrapper
                title="Invitations"
                iconClassName="fa fa-letter"
                hidden={this.props.mainState.userState.current_user.invitations.length === 0}
            >
                <InvitationsList accept={this.acceptInvitation} reject={this.rejectInvitation} invitations={this.props.mainState.userState.current_user.invitations} />
            </FullWidthCardWrapper>
            <FullWidthCardWrapper
                title="Edit profile"
                iconClassName="fa fa-user"
                hidden={false}
            >
                <ProfileForm 
                    user={this.state.user}
                    handlePwChange={this.handlePwChange}
                    handleChange={this.handleFormChange}
                    handleSubmit={this.handleProfileSubmit}
                />
            </FullWidthCardWrapper>
            <FullWidthCardWrapper
                title="Set default commune"
                iconClassName="fa fa-star-o"
                hidden={false}
            >
                <SetDefaultCommuneComponent
                    communes={this.props.mainState.communeState.communes}
                    saveDefaultCommune={this.saveDefaultCommune}
                    user={this.props.mainState.userState.current_user}
                />    
            </FullWidthCardWrapper>    
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

    saveDefaultCommune = (id: number) => {
        let user: User = this.props.mainState.userState.current_user;
        user.default_commune_id = id;
        this.props.mainState.userState.updateUser(user);
    }
        
}
