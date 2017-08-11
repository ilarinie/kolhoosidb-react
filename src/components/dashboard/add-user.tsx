import { AppState } from '../../store/state';
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingScreen } from '../util/loading-screen';
import { TextField, RaisedButton } from "material-ui";

@inject('appState')
@observer
export class AddUserComponent extends React.Component<{ appState: AppState }, {}>{
    render() { 
            let users = this.props.appState.all_users.map((user, index) => 
            <li key={index}>
                {user.username}             
            </li>
        );
        return (
            <LoadingScreen loading={this.props.appState.dataLoading}>
                <div className="full-size-component">
                  <p>Invite user by username</p>
                  <TextField id="username" type="text" hintText="Give username" /> <br />
                  <RaisedButton label="Select" onTouchTap={this.inviteUser} />
                </div>
            </LoadingScreen>
        );
    }
    inviteUser = () => {
        let username: string =  (document.getElementById('username') as HTMLInputElement).value;
        if (username) {
            this.props.appState.inviteUser(username);
        }
    }
}