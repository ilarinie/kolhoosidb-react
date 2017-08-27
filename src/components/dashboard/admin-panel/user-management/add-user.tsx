import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, RaisedButton, Card, CardActions } from 'material-ui';
import { CardHeader, CardText } from 'material-ui/Card';

@inject('mainState')
@observer
export class AddUserComponent extends React.Component<{ inviteUser: any }, {}> {
    render() {
        let title = (<p><i className="fa fa-sign-in" style={{ marginRight: '10px' }} /> Invite user </p>);
        return (
            <Card>
                <CardHeader
                    title={title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    <TextField id="username" type="text" hintText="Username" /> <br />
                    <CardActions>
                        <RaisedButton label="Send invitation" onTouchTap={this.inviteUser} />
                    </CardActions>
                </CardText>

            </Card>
        );
    }
    inviteUser = () => {
        let username: string = (document.getElementById('username') as HTMLInputElement).value;
        if (username) {
            this.props.inviteUser(username);
        }
    }
}