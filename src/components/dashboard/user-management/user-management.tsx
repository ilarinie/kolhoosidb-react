import * as React from 'react';
import { AddUserComponent } from './add-user';
import { observer, inject } from 'mobx-react';
import { MainState } from '../../../store/state';
import { SentInvitations } from './sent-invitations';

@inject('mainState')
@observer
export class UserManagementComponent extends React.Component<{mainState: MainState}, {}> {

    innerComponentContainer = {
        border: '1px solid grey',
        padding: '10px'
    };

    render() {
        return (
            <div className="full-size-component">
                <div style={this.innerComponentContainer}>
                    <AddUserComponent mainState={this.props.mainState} />
                </div>
                <div style={this.innerComponentContainer}>
                    <SentInvitations mainState={this.props.mainState} />
                </div>
            </div>
        );
    }

}