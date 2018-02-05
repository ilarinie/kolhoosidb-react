import * as React from 'react';
import AddUserComponent from './add-user';
import { MainState } from '../../../../store/state';
import { SentInvitations } from './sent-invitations';
import UserListComponent from './user-list';
import { Invitation } from '../../../../store/models/invitation';
import { User } from '../../../../store/models/user';
import { observer } from 'mobx-react';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { FaEnvelope, FaSignIn } from 'react-icons/lib/fa';
import { compose } from 'recompose';
import { decorate, style } from '../../../../theme';
import { WithStyles } from 'material-ui/styles/withStyles';

class UserManagementComponent extends React.Component<{ mainState: MainState } & WithStyles, {}> {

    componentDidMount() {
        this.props.mainState.userState.getUsers();
    }

    render() {
        return (
            <div>
                <AddUserComponent inviteUser={this.inviteUser} />
                <hr />
                <SentInvitations invitations={this.props.mainState.communeState.selectedCommune.invitations} cancelInvitation={this.cancelInvitation} />
                <hr />
                <UserListComponent removeUser={this.removeUser} users={this.props.mainState.userState.users} admins={this.props.mainState.userState.admins} />
            </div>
        );
    }

    inviteUser = (username: string) => {
        this.props.mainState.userState.inviteUser(username);
    }

    cancelInvitation = (invitation: Invitation) => {
        this.props.mainState.userState.cancelInvitation(invitation);
    }

    removeUser = (user: User) => {
        this.props.mainState.userState.removeUser(user);
    }

}

export default compose<{ mainState: MainState }, any>(
    decorate,
    style,
    observer,
)(UserManagementComponent);