import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { KolhoosiLargeTextInput } from '../../util/kolhoosi-large-text-input';
import SubmitButton from '../../util/submit-button';

export class CommuneCreationComponent extends React.Component<{ submitCommune: any, loading: boolean }, { commune: any }> {

    constructor(props: any) {
        super(props);
        let commune: any = {};
        commune.name = '';
        commune.description = '';
        this.state = {
            commune: commune
        };
        this.handleChange.bind(this);
    }

    render() {
        const { commune } = this.state;
        return (
            <div>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.handleError(errors)}
                >
                    <KolhoosiLargeTextInput
                        label="Name your new commune"
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        validators={['required']}
                        value={commune.name}
                        align="left"
                        currency={false}
                    />
                    <KolhoosiLargeTextInput
                        label="Describe your commune."
                        onChange={this.handleChange}
                        multiline={true}
                        rows={2}
                        type="text"
                        name="description"
                        validators={['required']}
                        value={commune.description}
                        align="left"
                        currency={false}
                    />
                    <SubmitButton
                        className="create-commune-button"
                        label="Create"
                        type="submit"
                        loading={this.props.loading}
                    />
                </ValidatorForm>
            </div>
        );
    }

    handleSubmit = () => {
        this.props.submitCommune(this.state.commune);
    }

    handleError = (errors: any) => {
        console.log(errors);
    }

    handleChange = (event: any) => {
        const { commune } = this.state;
        commune[event.target.name] = event.target.value;
        this.setState({ commune });
    }

}