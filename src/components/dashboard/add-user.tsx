import { MainState } from '../../store/state';
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingScreen } from '../util/loading-screen';
import { TextField, RaisedButton } from 'material-ui';

@inject('mainState')
@observer
export class AddUserComponent extends React.Component<{ mainState: MainState }, {}> {
    render() { 
            return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
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
            this.props.mainState.userState.inviteUser(username);
        }
    }
}