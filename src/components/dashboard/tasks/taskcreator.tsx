import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Task } from '../../../store/models/task';
import { RaisedButton } from 'material-ui';

export class TaskCreator extends React.Component<{editedTask?: Task, open: boolean, submitTask: any}, {task: any}> {

    constructor(props: any) {
        super(props);
        let task: any = {};
        task.name = '';
        task.priority = '';
        this.state = {
            task: task
        };
        if (this.props.editedTask) {
            this.state = {
                task: this.props.editedTask
            };
        }
        this.handleChange.bind(this);
    }

    render() {
        const { task } = this.state;
        return (
            <Dialog 
                title="Create a new task"
                open={this.props.open}
                modal={false}
            >
                <Card className="form-card">
                    <CardText>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={errors => this.handleError(errors)}
                        >
                            <TextValidator
                                floatingLabelText="Task name"
                                onChange={this.handleChange}
                                name="name"
                                type="text"
                                validators={['required']}
                                errorMessages={['Name is requred']}
                                value={task.name}
                            /><br />
                            <TextValidator
                                floatingLabelText="Task priority"
                                onChange={this.handleChange}
                                name="priority"
                                type="number"
                                validators={['required']}
                                errorMessages={['Priority is requred']}
                                value={task.priority}
                            /><br />
                            <RaisedButton label="Create" type="submit" />
                        </ValidatorForm>
                    </CardText>
                </Card>
            </Dialog>
        );
    }

    handleChange = (event: any) => {
        const { task } = this.state;
        task[event.target.name] = event.target.value;
        this.setState({ task });
    }

    handleSubmit = () => {
        this.props.submitTask(this.state.task);
    }

    handleError = (errors: any) => {
        console.log(errors);
    }

}