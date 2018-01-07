import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, RaisedButton, Card, CardActions } from 'material-ui';
import { CardHeader, CardText } from 'material-ui/Card';
import { FaSignIn } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';

@inject('mainState')
@observer
export class AddUserComponent extends React.Component<{ inviteUser: any }, {}> {
    render() {
        return (
            <div>
                <TextField id="username" type="text" hintText="Username" /> <br />
                <RaisedButton className="send-invitation-button" label="Send invitation" onClick={this.inviteUser} />
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