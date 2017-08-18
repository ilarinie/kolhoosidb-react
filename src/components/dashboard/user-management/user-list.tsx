import * as React from 'react';
import { User } from '../../../store/models/user';
export class UserListComponent extends React.Component<{users: User[], admins: User[], removeUser: any}, {} >{

    render () {
        let users = this.props.users.map((user, index) => (
            <UserEntry user={user} removeUser={this.props.removeUser} />
        ));
        let admins = this.props.admins.map((user, index) => (
            <li key={index}>{user.name}</li>
        ));

        return (
            <div>
                <h5>Admins</h5>
                <ul>
                    {admins}
                </ul>
                <h5>Users</h5>
                <ul>
                    {users}
                </ul>
            </div>
        );
    }

    removeUser = (user: User) => {
        this.props.removeUser(user);
    }

}

export class UserEntry extends React.Component<{user: User, removeUser: any}, {} > {
    render() {
        return (
            <li>{this.props.user.name}  <button onClick={this.removeUser}>remove</button></li>
        );
    }
    removeUser = () => {
        this.props.removeUser(this.props.user);
    }
}