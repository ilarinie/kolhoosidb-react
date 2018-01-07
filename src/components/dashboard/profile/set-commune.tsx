import * as React from 'react';
import { User } from '../../../store/models/user';
import { SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Commune } from '../../../store/models/commune';

interface SetDefaultCommuneComponentProps {
    user: User;
    communes: Commune[];
    saveDefaultCommune: any;
}

interface SetDefaultCommuneComponentState {
    id: number;
}

export class SetDefaultCommuneComponent extends React.Component<SetDefaultCommuneComponentProps, SetDefaultCommuneComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.user.default_commune_id ||  0
        };
    }

    save(id: number) {
        this.props.saveDefaultCommune(id);
    }

    render() {
        const { id } = this.state;
        let communes = this.props.communes.map((commune, index) => (
            <MenuItem
                primaryText={commune.name}
                value={commune.id}
                key={index}
            />
        ));
        return (
            <div>
                <SelectField
                    floatingLabelText="Default commune"
                    value={id}
                    onChange={this.handleCommuneChange}
                >
                    {communes}
                </SelectField><br />
                <RaisedButton
                    label="Set"
                    onClick={this.setDefaultCommune}
                />
            </div>
        );
    }

    setDefaultCommune = () => {
        this.props.saveDefaultCommune(this.state.id);
    }

    handleCommuneChange = (event, index, value) => {
        let { id } = this.state;
        id = value;
        this.setState({ id });
    }
}