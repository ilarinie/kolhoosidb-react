import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Dialog } from 'material-ui';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { Task } from '../../../../store/models/task';
import { RaisedButton } from 'material-ui';

export class TaskCreator extends React.Component<{ editedTask: Task, submitTask: any }, { task: any }> {

    fieldStyle = {
        width: '95%'
    };

    constructor(props: any) {
        super(props);
        this.state = {
            task: this.props.editedTask || new Task()
        };
    }

    render() {
        let label, title;
        if (this.state.task.name === '') {
            label = 'Create';
            title = 'Create a new Task';
        } else {
            label = 'Save changes';
            title = 'Edit task';
        }
        const { task } = this.state;
        return (
            <div style={{ padding: '10px' }}>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.handleError(errors)}
                >
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Task name"
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        validators={['required']}
                        errorMessages={['Name is requred']}
                        value={task.name}
                    /><br />
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Task priority"
                        onChange={this.handleChange}
                        name="priority"
                        type="number"
                        value={task.priority}
                    /><br />
                    <TextValidator
                        style={this.fieldStyle}
                        floatingLabelText="Points awarded for completion"
                        onChange={this.handleChange}
                        name="reward"
                        type="number"
                        value={task.reward}
                    /><br />
                    <RaisedButton className="submit-task-button" label={label} type="submit" />
                </ValidatorForm>
            </div>
        );
    }

    handleSubmit = () => {
        this.props.submitTask(this.state.task);
    }

    handleError = (errors: any) => {
        console.log(errors);
    }

    handleChange = (event: any) => {
        let newTask = this.state.task;
        newTask[event.target.name] = event.target.value;
        this.setState({ task: newTask });
    }

}