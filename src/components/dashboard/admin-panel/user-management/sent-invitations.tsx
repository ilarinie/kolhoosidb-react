import * as React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { Invitation } from '../../../../store/models/invitation';

export class SentInvitations extends React.Component<{ invitations: Invitation[], cancelInvitation: any}, {}> {
    render() {
        let invitations = this.props.invitations.map((invitation, index) => (
            <InvitationCard invitation={invitation} key={index} cancelInvitation={this.props.cancelInvitation} />
        ));
        return (
            <div>
                <h4>Sent Invitations</h4>
                {invitations}
            </div>
        );
    }
}

class InvitationCard extends React.Component<{ invitation: Invitation, cancelInvitation: any}, {} > {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.invitation.username}
                />
                <CardActions>
                    <RaisedButton label="Cancel" onTouchTap={this.cancel} />
                </CardActions>
            </Card>
            
        );
    }

    cancel = () => {
        this.props.cancelInvitation(this.props.invitation);
    }

}