import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { Task } from '../../../../store/models/task';
import { KolhoosiLargeTextInput } from '../../../util/kolhoosi-large-text-input';
import SubmitButton from '../../../util/submit-button';
import { TaskPrioritySelector } from '../../tasks/task-priority-selector';

export interface TaskCreatorProps {
    editedTask: Task;
    submitTask: any;
    loading: boolean;
}

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

    handlePriorityChange = (value: number) => {
        let newTask = this.state.task;
        newTask.priority = value;
        this.setState({ task: newTask });
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
        let completionTextExample = '<username> <completion text> <task name>';
        return (
            <div style={{ padding: '10px' }}>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => this.handleError(errors)}
                >
                    <div style={{ border: '1px solid lightgray', padding: '1em 1em 2em 1em' }}>
                        <p>
                            Task name.
                            Pretty self-explanatory, just give the task a name.
                        </p>
                        <KolhoosiLargeTextInput
                            label="Task name"
                            name="name"
                            onChange={this.handleChange}
                            type="text"
                            validators={['required', 'minStringLength:2', 'maxStringLength:35']}
                            value={task.name}
                            currency={false}
                            align="left"
                        />
                    </div>
                    <div style={{ border: '1px solid lightgray', padding: '1em 1em 2em 1em' }}>
                        <TaskPrioritySelector
                            value={task.priority}
                            onChange={this.handlePriorityChange}
                        />
                    </div>
                    <div style={{ border: '1px solid lightgray', padding: '1em 1em 2em 1em' }}>
                        <p>Task reward</p>
                        <p>
                            You can set imaginary points awarded to the user completing the task.
                            For example, you could set a higher reward for the more demanding or time consuming tasks.
                        </p>
                        <KolhoosiLargeTextInput
                            label="Points"
                            name="reward"
                            onChange={this.handleChange}
                            type="text"
                            validators={[]}
                            value={task.reward}
                            currency={false}
                            align="left"
                        />
                    </div>
                    <div style={{ border: '1px solid lightgray', padding: '1em 1em 2em 1em' }}>
                        <p>
                            Completion message.
                            If you have set up a telegram channel for your commune, you can set a custom
                            message that is sent upon completing the task.
                            Message is formatted as follows:
                        </p>
                        <pre>{completionTextExample}</pre>
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
                    </div>
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

}