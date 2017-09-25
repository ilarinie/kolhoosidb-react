import * as React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { SubmitButton } from '../../../util/submit-button';
import { Commune } from '../../../../store/models/commune';
import { CardHeader, Card } from 'material-ui';
import { CardText } from 'material-ui/Card';
import { FaCogs } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';

export class CommuneDetailsEditor extends React.Component<{ commune: Commune, submitCommuneChanges: any }, { commune: Commune }> {
    constructor(props: any) {
        super(props);
        this.state = {
            commune: this.props.commune
        };
        this.handleChange.bind(this);
    }
    render() {
        const { commune } = this.state;
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
                <SubmitButton loading={false} label="Save" type="submit" />
            </ValidatorForm>
        );
    }

    handleChange = (event: any) => {
        let commune = this.state.commune;
        commune[event.target.name] = event.target.value;
        this.setState({ commune: commune });
    }

    handleSubmit = () => {
        this.props.submitCommuneChanges(this.state.commune);
    }
}