import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, Button } from 'material-ui';
import { FaSignIn } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';
import { IconTitle } from '../../../util/icon-title';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../../theme';

class AddUserComponent extends React.Component<{ inviteUser: any } & WithStyles, {}> {
    render() {
        return (
            <div style={{ minHeight: '100px', padding: '10px' }}>
                <IconTitle icon={<FaSignIn />} titleText="Invite user" />
                <div style={{ height: '20px' }}>
                    <TextField style={{ width: '45%', float: 'left', marginRight: '10px' }} id="username" type="text" placeholder="Username" /> <br />
                    <Button
                        style={{ marginTop: '-70px', width: '45%' }}
                        className="send-invitation-button"
                        onClick={this.inviteUser}
                    >Send invitation
                    </Button>
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

export default compose<{ inviteUser: any }, any>(
    decorate,
    style,
    observer,
)(AddUserComponent);