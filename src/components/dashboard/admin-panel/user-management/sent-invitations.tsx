import * as React from 'react';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';
import { Invitation } from '../../../../store/models/invitation';
import { FaEnvelope } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { IconTitle } from '../../../util/icon-title';

export class SentInvitations extends React.Component<{ invitations: Invitation[], cancelInvitation: any }, {}> {
    render() {
        let invitations = this.props.invitations.map((invitation, index) => (
            <InvitationCard invitation={invitation} key={index} cancelInvitation={this.props.cancelInvitation} />
        ));
        if (invitations.length === 0) {
            invitations = [(<div key={0}>No pending invitations</div>)];
        }
        return (
            <div style={{ padding: '10px' }}>
                <IconTitle icon={<FaEnvelope />} titleText="Invited users:" />
                <div>{invitations}</div>
            </div>
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
                    <RaisedButton label="Cancel" onClick={this.cancel} />
                </CardActions>
            </Card>

        );
    }

    cancel = () => {
        this.props.cancelInvitation(this.props.invitation);
    }

}