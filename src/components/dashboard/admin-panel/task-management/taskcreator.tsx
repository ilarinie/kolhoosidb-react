import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Task } from '../../../../store/models/task';
import { RaisedButton } from 'material-ui';

export class TaskCreator extends React.Component<{ editedTask: Task, handleChange: any, open: boolean, handleClose: any, submitTask: any }, { task: any }> {

    fieldStyle = {
        width: '95%'
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        let label, title;
        if (this.props.editedTask.name === '') {
            label = 'Create';
            title = 'Create a new Task';
        } else {
            label = 'Save changes';
            title = 'Edit task';
        }
        return (
            <Dialog
                title={title}
                open={this.props.open}
                modal={false}
                onRequestClose={this.props.handleClose}
            >
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.handleError(errors)}
                >
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Task name"
                        onChange={this.props.handleChange}
                        name="name"
                        type="text"
                        validators={['required']}
                        errorMessages={['Name is requred']}
                        value={this.props.editedTask.name}
                    /><br />
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Task priority"
                        onChange={this.props.handleChange}
                        name="priority"
                        type="number"
                        value={this.props.editedTask.priority}
                    /><br />
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Points awarded for completion"
                        onChange={this.props.handleChange}
                        name="reward"
                        type="number"
                        value={this.props.editedTask.reward}
                    /><br />
                    <RaisedButton className="submit-task-button" label={label} type="submit" />
                </ValidatorForm>
            </Dialog>
        );
    }

    handleSubmit = () => {
        this.props.submitTask(this.props.editedTask);
    }

    handleError = (errors: any) => {
        console.log(errors);
    }

}