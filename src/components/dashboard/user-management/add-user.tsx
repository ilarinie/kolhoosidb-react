import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, RaisedButton } from 'material-ui';

@inject('mainState')
@observer
export class AddUserComponent extends React.Component<{ inviteUser: any }, {}> {
    render() { 
            return (
                <div>
                  <p>Invite user by username</p>
                  <TextField id="username" type="text" hintText="Give username" /> <br />
                  <RaisedButton label="Select" onTouchTap={this.inviteUser} />
                </div>
        );
    }
    inviteUser = () => {
        let username: string =  (document.getElementById('username') as HTMLInputElement).value;
        if (username) {
            this.props.inviteUser(username);
        }
    }
}