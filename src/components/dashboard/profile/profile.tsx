import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { MainState } from '../../../store/state';
import { InvitationsList } from './invitations';
import { Invitation } from '../../../store/models/invitation';

@inject('mainState')
@observer 
export class ProfileComponent extends React.Component<{mainState: MainState}, {}> {
    render() {
        return (
            <div className="full-size-component">
                <InvitationsList accept={this.acceptInvitation} reject={this.rejectInvitation} invitations={this.props.mainState.userState.current_user.invitations} />
            </div>
        );
    }

    acceptInvitation = (invitation: Invitation) => {
        this.props.mainState.userState.acceptInvitation(invitation);
    }

    rejectInvitation = (invitation: Invitation) => {
        this.props.mainState.userState.rejectInvitation(invitation);       
    }
        
}