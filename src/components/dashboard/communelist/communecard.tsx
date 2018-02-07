import * as React from 'react';
import { Commune } from '../../../store/models/commune';
import { Button, Card, CardActions, CardHeader } from 'material-ui';
import { Checkbox } from 'material-ui';
import { FaArrowCircleRight } from 'react-icons/lib/fa';
import { FaMailForward } from 'react-icons/lib/fa';
import { WithStyles } from 'material-ui/styles/withStyles';
import { style, decorate } from '../../../theme';
import { compose } from 'recompose';

interface CommuneCardProps {
    commune: Commune;
    selectCommune: any;
    deleteCommune: any;
    setDefaultCommune: any;
    defaultCommuneId: number;
}

class CommuneCard extends React.Component<CommuneCardProps & WithStyles, {}> {

    render() {
        let deleteButton = null;
        if (this.props.commune.is_owner) {
            deleteButton = (
                <Button raised={true} onClick={this.deleteCommune} >Delete</Button>
            );
        }
        let members = this.props.commune.members.map((member, index) => (
            <small key={index}>{member.name}, </small>
        ));
        return (
            <Card style={{ width: '350px', maxWidth: '99vw', margin: '20px auto' }}>
                <CardHeader
                    title={this.props.commune.name}
                >
                    <small>{this.props.commune.description}</small>
                </CardHeader>
                <div style={{ padding: '0px 15px' }}>
                    <small>Members: </small><br />
                    {members}
                </div>
                <CardActions>
                    <Button
                        raised={true}
                        onClick={this.setDefaultCommune}
                        disabled={(this.props.defaultCommuneId === this.props.commune.id)}
                        fullWidth={true}

                    >Set as default
                    </Button><br />
                    <Button
                        raised={true}
                        fullWidth={true}
                        className="select-commune-button"
                        onClick={this.selectCommune}
                    >Select
                    </Button>
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

export default compose<CommuneCardProps, any>(
    decorate,
    style,
)(CommuneCard);