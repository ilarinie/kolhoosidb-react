import * as React from 'react';
import { Commune } from '../../../store/models/commune';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class CommuneCard extends React.Component<{commune: Commune, selectCommune: any, deleteCommune: any}, {}> {

    render() {
        let deleteButton = null;
        if (this.props.commune.current_user_admin) {
            deleteButton = (
                <RaisedButton label="Delete" onTouchTap={this.deleteCommune} backgroundColor="warning" />
            );
        }
        return (
            <Card style={{ width: '300px', margin: '20px auto' }}>
                <CardHeader
                    title={this.props.commune.name}
                    subtitle={this.props.commune.description}
                />
                <CardActions>
                    <RaisedButton label="Select" onTouchTap={this.selectCommune} />
                    {deleteButton}
                </CardActions>    
            </Card>
        );
    }

    selectCommune = () => {
        this.props.selectCommune(this.props.commune);  
    }

    deleteCommune = () => {
        this.props.deleteCommune(this.props.commune);
    }
}