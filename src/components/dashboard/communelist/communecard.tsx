import * as React from 'react';
import { Commune } from '../../../store/models/commune';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { MainState } from '../../../store/state';
import RaisedButton from 'material-ui/RaisedButton';

export class CommuneCard extends React.Component<{commune: Commune, value: number, mainState: MainState}, {}> {

    render() {
        return (
            <Card style={{ width: '90%', margin: '20px auto' }}>
                <CardHeader
                    title={this.props.commune.name}
                    subtitle={this.props.commune.description}
                />
                <CardActions>
                    <RaisedButton label="Select" onTouchTap={this.selectCommune} />
                    <RaisedButton disabled={!this.props.commune.current_user_admin} label="Delete" onTouchTap={this.deleteCommune} backgroundColor="warning" />
                </CardActions>    
            </Card>
        );
    }

    selectCommune = () => {
        this.props.mainState.communeState.selectCommune(this.props.value);
    }

    deleteCommune = () => {
        this.props.mainState.communeState.deleteCommune(this.props.commune.id);
    }
}