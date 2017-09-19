import * as React from 'react';
import { AddUserComponent } from './add-user';
import { MainState } from '../../../../store/state';
import { SentInvitations } from './sent-invitations';
import { UserListComponent } from './user-list';
import { Invitation } from '../../../../store/models/invitation';
import { User } from '../../../../store/models/user';
import { observer } from 'mobx-react';

@observer
export class UserManagementComponent extends React.Component<{ mainState: MainState }, {}> {


    componentDidMount() {
        this.props.mainState.userState.getUsers();
    }

    render() {
        return (
            <div>
                <AddUserComponent inviteUser={this.inviteUser} />
                <SentInvitations invitations={this.props.mainState.communeState.selectedCommune.invitations} cancelInvitation={this.cancelInvitation} />
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