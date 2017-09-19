import * as React from 'react';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { Invitation } from '../../../../store/models/invitation';
import { FaEnvelope } from 'react-icons/lib/fa';

export class SentInvitations extends React.Component<{ invitations: Invitation[], cancelInvitation: any }, {}> {
    render() {
        let invitations = this.props.invitations.map((invitation, index) => (
            <InvitationCard invitation={invitation} key={index} cancelInvitation={this.props.cancelInvitation} />
        ));
        let title = (<p><FaEnvelope style={{ marginRight: '10px' }} />Sent invitations ({invitations.length})</p>);
        if (invitations.length === 0) {
            invitations = [(<div key={0}>No pending invitations</div>)];
        }
        return (
            <Card>
                <CardHeader
                    title={title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    {invitations}
                </CardText>
            </Card>
        );
    }
}

class InvitationCard extends React.Component<{ invitation: Invitation, cancelInvitation: any }, {}> {
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