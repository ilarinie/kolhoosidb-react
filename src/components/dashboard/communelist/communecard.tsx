import * as React from 'react';
import { Commune } from '../../../store/models/commune';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { AppState } from '../../../store/state';

export class CommuneCard extends React.Component<{commune: Commune, value: number, appState: AppState}, {}> {
    render() {
        return (
            <Card style={{ width: '90%' }}>
                <CardHeader
                    title={this.props.commune.name}
                    subtitle={this.props.commune.description}
                />
                <CardActions>
                    <FlatButton label="Select" onTouchTap={this.selectCommune} />
                    <FlatButton label="Delete" onTouchTap={this.deleteCommune} backgroundColor="warning" />
                </CardActions>    
            </Card>
        );
    }

    selectCommune = () => {
        this.props.appState.selectCommune(this.props.value);
    }

    deleteCommune = () => {
        this.props.appState.deleteCommune(this.props.commune.id);
    }
}