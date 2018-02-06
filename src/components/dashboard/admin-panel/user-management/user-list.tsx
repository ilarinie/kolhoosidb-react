import * as React from 'react';
import { User } from '../../../../store/models/user';
import { Button, Card, CardHeader, CardContent, CardActions } from 'material-ui';
import { FaStar, FaUser } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../../theme';

class UserListComponent extends React.Component<{ users: User[], admins: User[], removeUser: any } & WithStyles, {}> {

    render() {
        let users = this.props.users.map((user, index) => (
            <UserEntry key={index} user={user} removeUser={this.props.removeUser} />
        ));
        let admins = this.props.admins.map((user, index) => (
            <AdminEntry key={index} user={user} removeUser={this.props.removeUser} />
        ));
        let adminTitle = (<p><FaStar style={{ marginRight: '10px' }} />Admins ({admins.length})</p>);
        let userTitle = (<p><FaUser style={{ marginRight: '10px' }} />Users ({users.length})</p>);
        return (
            <div>
                <h3>Communes' users</h3>
                <FullWidthCardWrapper
                    title="Admins"
                    icon={<FaStar />}
                    classIdentifier="commune-admins-card"
                >
                    {admins}
                </FullWidthCardWrapper>
                <FullWidthCardWrapper
                    title="Users"
                    icon={<FaUser />}
                    classIdentifier="commune-users-card"
                >
                    {users}
                </FullWidthCardWrapper>
            </div>
        );
    }

    removeUser = (user: User) => {
        this.props.removeUser(user);
    }

}

export class UserEntry extends React.Component<{ user: User, removeUser: any }, {}> {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.user.name}
                />

                <CardContent
                >
                    <CardActions>
                        <Button raised={true} onClick={this.removeUser} >Remove</Button>
                        <Button raised={true} className={'promote_user_button_' + this.props.user.username}>Promote</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
    removeUser = () => {
        this.props.removeUser(this.props.user);
    }
}

export class AdminEntry extends React.Component<{ user: User, removeUser: any }, {}> {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.user.name}
                />
                <CardContent
                >
                    <CardActions>
                        <Button raised={true} onClick={this.removeUser}>Remove</Button>
                        <Button raised={true}>Demote</Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
    removeUser = () => {
        this.props.removeUser(this.props.user);
    }
}

export default compose<any, any>(
    decorate,
    style,
)(UserListComponent);