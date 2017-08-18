import * as React from 'react';
import { MainState } from '../../../../store/state';
import { Task } from '../../../../store/models/task';
import { TaskCreator } from './taskcreator';
import { observer } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import { CardHeader, CardActions, Card } from 'material-ui/Card';

@observer
export class TaskManagement extends React.Component<{mainState: MainState}, {editedTask: Task, dialogOpen: boolean} > {

    constructor(props: any) {
        super(props);
        this.state = {
            editedTask: new Task(),
            dialogOpen: false
        };
    }

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskRow key={index} task={task} editTask={this.editTask} deleteTask={this.deleteTask} />
        ));
        return (
            <div className="full-size-component">
                {tasks}
                <TaskCreator 
                    handleClose={this.handleDialogClose}
                    handleChange={this.handleTaskChange}
                    editedTask={this.state.editedTask}
                    submitTask={this.submitTask}
                    open={this.state.dialogOpen}
                />
            </div>
        );
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    }

    editTask = (task: Task) => {
        this.setState({editedTask: task});
        this.setState({dialogOpen: true});
    }

    handleTaskChange = (event: any) => {
            let newTask = this.state.editedTask;
            newTask[event.target.name] = event.target.value;
            this.setState({ editedTask: newTask });
    }

    createTask = () => {
        this.setState({editedTask: new Task()});
        this.setState({dialogOpen: true});
    }

    deleteTask = (task: Task) => {
        this.props.mainState.taskState.deleteTask(task);
    }

    submitTask = (task: Task) => {
        this.setState({dialogOpen: false});
        if (task.id) {
            this.props.mainState.taskState.updateTask(task);
        } else {
            this.props.mainState.taskState.createTask(task);
        }
    }
}

export class TaskRow extends React.Component<{task: Task, editTask: any, deleteTask: any}, {} > {

    taskStyles = {
        border: '0.5px solid gray'
    };
    buttonStyles = {
        float: 'right'
    };

    render() {
        return (
            <Card style={{margin: '5px auto'}}>
                <CardHeader
                    title={this.props.task.name}
                    subtitle={'Priority: ' + this.props.task.priority}
                />
                <CardActions>
                    <RaisedButton label="Edit" onTouchTap={this.editTask}  />
                    <RaisedButton label="Delete" onTouchTap={this.deleteTask} />
                </CardActions>
            </Card>    
        );
    }

    editTask = () => {
        this.props.editTask(this.props.task);
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task);
    }

}