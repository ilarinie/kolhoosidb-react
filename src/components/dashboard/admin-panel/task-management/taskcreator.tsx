import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Dialog } from 'material-ui';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { Task } from '../../../../store/models/task';
import { RaisedButton } from 'material-ui';
import { KolhoosiLargeTextInput } from '../../../util/kolhoosi-large-text-input';
import { SubmitButton } from '../../../util/submit-button';

export class TaskCreator extends React.Component<{ editedTask: Task, submitTask: any, loading: boolean }, { task: any }> {

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
                    <KolhoosiLargeTextInput
                        label="Name of the task"
                        name="name"
                        onChange={this.handleChange}
                        type="text"
                        validators={['required', 'minStringLength:2', 'maxStringLength:35']}
                        value={task.name}
                        currency={false}
                        align="left"
                    />
                    <KolhoosiLargeTextInput
                        label="Priority"
                        name="priority"
                        onChange={this.handleChange}
                        type="text"
                        validators={[]}
                        value={task.priority}
                        currency={false}
                        align="left"
                    />
                    <KolhoosiLargeTextInput
                        label="Points"
                        name="points"
                        onChange={this.handleChange}
                        type="text"
                        validators={[]}
                        value={task.reward}
                        currency={false}
                        align="left"
                    />
                    <KolhoosiLargeTextInput
                        label="Completion text"
                        name="completion_text"
                        onChange={this.handleChange}
                        type="text"
                        validators={[]}
                        value={task.completion_text}
                        currency={false}
                        align="left"
                    />
                    <br />
                    <SubmitButton
                        className="submit-task-button"
                        label={label}
                        type="submit"
                        loading={this.props.loading}
                        fullWidth={true}
                        backgroundColor="#43A047"
                    />
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