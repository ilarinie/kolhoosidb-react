import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, FlatButton, Card, CardActions } from 'material-ui';
import { CardHeader, CardText } from 'material-ui/Card';
import { FaSignIn } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { IconTitle } from '../../../util/icon-title';

@inject('mainState')
@observer
export class AddUserComponent extends React.Component<{ inviteUser: any }, {}> {
    render() {
        return (
            <div style={{ minHeight: '100px', padding: '10px' }}>
                <IconTitle icon={<FaSignIn />} titleText="Invite user" />
                <div style={{ height: '20px' }}>
                    <TextField style={{ width: '45%', float: 'left', marginRight: '10px' }} id="username" type="text" hintText="Username" /> <br />
                    <FlatButton
                        style={{ marginTop: '-70px', width: '45%' }}
                        className="send-invitation-button"
                        label="Send invitation"
                        onClick={this.inviteUser}
                    />
                </div>
            </div>
        );
    }
    inviteUser = () => {
        let username: string = (document.getElementById('username') as HTMLInputElement).value;
        if (username) {
            this.props.inviteUser(username);
        }
    }
}