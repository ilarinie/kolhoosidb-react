import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { MainState } from '../../../store/state';
import InvitationsList from './invitations';
import { Invitation } from '../../../store/models/invitation';
import { User } from '../../../store/models/user';
import ProfileForm from './profile-form';
import { FullWidthCardWrapper } from '../../util/full-width-card-wrapper';
import { LatestActivityComponent } from './latest-activity';
import { FaUser, FaEnvelopeO, FaStarO } from 'react-icons/lib/fa';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';

class ProfileComponent extends React.Component<{ mainState: MainState } & WithStyles, { user: User }> {
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
            <div style={this.containerStyle} >
                <FullWidthCardWrapper
                    title="Invitations"
                    icon={<FaEnvelopeO />}
                    hidden={this.props.mainState.userState.current_user.invitations.length === 0}
                    classIdentifier="invitations-card"
                >
                    <InvitationsList accept={this.acceptInvitation} reject={this.rejectInvitation} invitations={this.props.mainState.userState.current_user.invitations} />
                </FullWidthCardWrapper>
                <FullWidthCardWrapper
                    title="Edit profile"
                    icon={<FaUser />}
                    hidden={false}
                    classIdentifier="edit-profile-card"
                >
                    <ProfileForm
                        user={this.state.user}
                        handlePwChange={this.handlePwChange}
                        handleChange={this.handleFormChange}
                        handleSubmit={this.handleProfileSubmit}
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
        this.setState({ user: updatedUser });
    }

    handlePwChange = (password: string, password_confirmation: string) => {
        this.props.mainState.userState.changePassword(password, password_confirmation);
    }

    saveDefaultCommune = (id: number) => {
        let user: User = this.props.mainState.userState.current_user;
        user.default_commune_id = id;
        this.props.mainState.userState.updateUser(user);
    }

    saveDefaultTheme = (theme: string) => {
        let user: User = this.props.mainState.userState.current_user;
        user.default_theme = theme;
        this.props.mainState.userState.updateUser(user);
        this.props.mainState.uiState.switchTheme(user.default_theme);
    }
}
export default compose<{ mainState: MainState } & WithStyles, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(ProfileComponent);
