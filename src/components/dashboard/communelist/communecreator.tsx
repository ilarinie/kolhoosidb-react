import * as React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import { AppState } from '../../../store/state';

export class CommuneCreationComponent extends React.Component<{appState: AppState}, {commune: any}> {

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
            <div className="full-size-component">
                <h4> Create a new commune </h4>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.handleError(errors)}
                >
                    <TextValidator
                        floatingLabelText="Commune name"
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        validators={['required']}
                        errorMessages={['Name is requred']}
                        value={commune.name}
                    /><br />
                    <TextValidator
                        floatingLabelText="Commune description"
                        onChange={this.handleChange}
                        multiLine={true}
                        rows={2}
                        type="text"
                        name="description"
                        validators={['required']}
                        errorMessages={['Description is required']}
                        value={commune.description}
                        
                    /><br />
                    <RaisedButton label="Create" type="submit" />
                </ValidatorForm>
            </div>
        );
    }

    handleSubmit = () => {
        this.props.appState.createCommune(this.state.commune);
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