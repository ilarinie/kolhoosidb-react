import { MainState } from '../../../store/state';
import * as React from 'react';
import { Invitation } from '../../../store/models/invitation';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';

export class SentInvitations extends React.Component<{ mainState: MainState }, {}> {
    render() {
        let invitations = this.props.mainState.communeState.selectedCommune.invitations.map((invitation, index) => (
            <InvitationCard invitation={invitation} key={index} />
        ));
        return (
            <div>
                <h4>Sent Invitations</h4>
                {invitations}
            </div>
        );
    }
}

class InvitationCard extends React.Component<{ invitation: Invitation}, {} > {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.invitation.commune_name}
                />
                <CardActions>
                    <RaisedButton label="Cancel" />
                </CardActions>
            </Card>
            
        );
    }

}