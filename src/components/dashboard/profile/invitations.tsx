import * as React from 'react';
import { Invitation } from '../../../store/models/invitation';
import { Card, CardActions, CardHeader } from 'material-ui';
import { Button } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { style, decorate } from '../../../theme';

class InvitationsList extends React.Component<{ accept: any, reject: any, invitations: Invitation[] } & WithStyles, {}> {
    render() {
        let invitations = this.props.invitations.map((invitation, index) => (
            <InvitationCard key={index} invitation={invitation} accept={this.acceptInvitation} reject={this.rejectInvitation} />
        ));
        return (
            <div>
                <h4>Following communes have invited you</h4>
                {invitations}
            </div>
        );
    }

    acceptInvitation = (invitation: Invitation) => {
        this.props.accept(invitation);
    }

    rejectInvitation = (invitation: Invitation) => {
        this.props.reject(invitation);
    }
}

class InvitationCard extends React.Component<{ invitation: Invitation, accept: any, reject: any }, {}> {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.invitation.commune_name}
                />
                <CardActions>
                    <Button raised={true} className="accept-invitation-button" onClick={this.handleAccept} >Accept</Button>
                    <Button raised={true} onClick={this.handleReject}>Reject</Button>
                </CardActions>
            </Card>
        );
    }

    handleAccept = () => {
        this.props.accept(this.props.invitation);
    }

    handleReject = () => {
        this.props.reject(this.props.invitation);
    }

}

export default compose<any, any>(
    decorate,
    style,
)(InvitationsList);