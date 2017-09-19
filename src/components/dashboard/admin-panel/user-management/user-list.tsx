import * as React from 'react';
import { User } from '../../../../store/models/user';
import { Card, CardText, CardActions } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { FaStar, FaUser } from 'react-icons/lib/fa';

export class UserListComponent extends React.Component<{ users: User[], admins: User[], removeUser: any }, {}> {

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
                <Card>
                    <CardHeader
                        title={adminTitle}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        {admins}
                    </CardText>
                </Card>
                <Card style={{ marginTop: '10px' }}>
                    <CardHeader
                        title={userTitle}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        {users}
                    </CardText>
                </Card>
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
                    subtitle="Expand for actions"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    <CardActions>
                        <RaisedButton onTouchTap={this.removeUser} label="Remove" />
                        <RaisedButton label="Promote" />
                    </CardActions>
                </CardText>
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
                    subtitle="Expand for actions"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    <CardActions>
                        <RaisedButton onTouchTap={this.removeUser} label="Remove" />
                        <RaisedButton label="Demote" />
                    </CardActions>
                </CardText>
            </Card>
        );
    }
    removeUser = () => {
        this.props.removeUser(this.props.user);
    }
}