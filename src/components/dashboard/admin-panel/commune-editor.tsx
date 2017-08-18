import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer } from 'mobx-react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Commune } from '../../../store/models/commune';
import { SubmitButton } from '../../util/submit-button';

@observer
export class CommuneEditor extends React.Component<{mainState: MainState}, {commune: Commune, loading: boolean}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            commune: this.props.mainState.communeState.selectedCommune,
            loading: false
        };
        this.handleChange.bind(this);
    }

    handleChange = (event: any) => {
        let commune  = this.state.commune;
        commune[event.target.name] = event.target.value;
        this.setState({commune: commune});
    }

    render() {
        const commune = this.state.commune;
        return (
            <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator
                    floatingLabelText="Commune name"
                    name="name"
                    type="text"
                    value={commune.name}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['Name is requred']}
                /><br />
                <TextValidator
                    floatingLabelText="Commune description"
                    name="description"
                    type="text"
                    multiLine={true}
                    rows={2}
                    value={commune.description}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['Description is requred']}
                /><br />
                <SubmitButton loading={this.state.loading} label="Save" type="submit" />
            </ValidatorForm>
        );
    }

    handleSubmit = () => {
        this.setState({loading: true});
        this.props.mainState.communeState.updateCommune(this.state.commune).then(() => {
            this.setState({loading: false});
        });
    }

}