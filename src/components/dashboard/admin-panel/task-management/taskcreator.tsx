import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Task } from '../../../../store/models/task';
import { RaisedButton } from 'material-ui';

export class TaskCreator extends React.Component<{ editedTask: Task, handleChange: any, open: boolean, handleClose: any, submitTask: any }, { task: any }> {

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
                <Card className="form-card">
                    <CardText>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                            onError={errors => this.handleError(errors)}
                        >
                            <TextValidator
                                floatingLabelText="Task name"
                                onChange={this.props.handleChange}
                                name="name"
                                type="text"
                                validators={['required']}
                                errorMessages={['Name is requred']}
                                value={this.props.editedTask.name}
                            /><br />
                            <TextValidator
                                floatingLabelText="Task priority"
                                onChange={this.props.handleChange}
                                name="priority"
                                type="number"
                                value={this.props.editedTask.priority}
                            /><br />
                            <TextValidator
                                floatingLabelText="Points awarded for completion"
                                onChange={this.props.handleChange}
                                name="reward"
                                type="number"
                                value={this.props.editedTask.reward}
                            /><br />
                            <RaisedButton label={label} type="submit" />
                        </ValidatorForm>
                    </CardText>
                </Card>
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