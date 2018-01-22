import * as React from 'react';
import { Commune } from '../../../store/models/commune';
import { RaisedButton, Card, CardActions, CardHeader } from 'material-ui';
import { Checkbox } from 'material-ui';
import { FaArrowCircleRight } from 'react-icons/lib/fa';
import { FontIcon } from 'material-ui/FontIcon';
import ContentForward from 'material-ui/svg-icons/content/forward';

interface CommuneCardProps {
    commune: Commune;
    selectCommune: any;
    deleteCommune: any;
    setDefaultCommune: any;
    defaultCommuneId: number;
}

export class CommuneCard extends React.Component<CommuneCardProps, {}> {

    render() {
        let deleteButton = null;
        if (this.props.commune.is_owner) {
            deleteButton = (
                <RaisedButton label="Delete" onClick={this.deleteCommune} backgroundColor="warning" />
            );
        }
        let members = this.props.commune.members.map((member, index) => (
            <small key={index}>{member.name}, </small>
        ));
        return (
            <Card style={{ width: '400px', maxWidth: '99vw', margin: '20px auto' }}>
                <CardHeader
                    title={this.props.commune.name}
                    subtitle={this.props.commune.description}
                    titleStyle={{ fontWeight: 'bold', fontSize: '30px' }}
                />
                <div style={{ padding: '0px 15px' }}>
                    <small>Members: </small><br />
                    {members}
                </div>
                <CardActions>
                    <RaisedButton
                        label="Set as default"
                        onClick={this.setDefaultCommune}
                        disabled={(this.props.defaultCommuneId === this.props.commune.id)}
                        fullWidth={true}

                    /><br />
                    <RaisedButton
                        fullWidth={true}
                        className="select-commune-button"
                        label="Select"
                        onClick={this.selectCommune}
                        backgroundColor="#43A047"
                        icon={<ContentForward color="white" />}
                    />
                    {/* {deleteButton} */}
                </CardActions>
            </Card>
        );
    }

    selectCommune = () => {
        this.props.selectCommune(this.props.commune);
    }

    setDefaultCommune = () => {
        this.props.setDefaultCommune(this.props.commune);
    }

    deleteCommune = () => {
        this.props.deleteCommune(this.props.commune);
    }
}