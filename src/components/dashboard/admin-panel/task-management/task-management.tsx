import * as React from 'react';
import { MainState } from '../../../../store/state';
import { Task } from '../../../../store/models/task';
import { TaskCreator } from './taskcreator';
import { observer, inject } from 'mobx-react';
import { RaisedButton, CardHeader, CardActions, Card, Checkbox } from 'material-ui';
import ReactTable from 'react-table';

@observer
export class TaskManagement extends React.Component<{ mainState: MainState }, { editedTask: Task, dialogOpen: boolean }> {

    columns = [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Priority',
            id: 'priority',
            accessor: 'priority',
        },
        {
            Header: 'Points',
            accessor: 'reward',
        }
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            editedTask: new Task(),
            dialogOpen: false
        };
    }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.getData()}
                    columns={this.columns}
                    SubComponent={row => (
                        <TaskCreator
                            editedTask={row.original}
                            submitTask={this.submitTask}
                            loading={this.props.mainState.uiState.tasksLoading}
                        />
                    )}
                />
                <p>New task</p>
                <TaskCreator
                    editedTask={this.state.editedTask}
                    submitTask={this.submitTask}
                    loading={this.props.mainState.uiState.tasksLoading}
                />
            </div>
        );
    }

    getData = () => {
        let array = [];
        this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => {
            array.push(task);
        });
        return array;
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    editTask = (task: Task) => {
        this.setState({ editedTask: task });
        this.setState({ dialogOpen: true });
    }

    deleteTask = (task: Task) => {
        this.props.mainState.taskState.deleteTask(task);
    }

    submitTask = (task: Task) => {
        this.setState({ dialogOpen: false });
        if (task.id) {
            this.props.mainState.taskState.updateTask(task);
        } else {
            this.props.mainState.taskState.createTask(task);
        }
    }
}

export class TaskRow extends React.Component<{ task: Task, editTask: any, deleteTask: any }, {}> {

    taskStyles = {
        border: '0.5px solid gray'
    };
    buttonStyles = {
        float: 'right'
    };

    render() {
        return (
            <Card style={{ margin: '5px auto' }}>
                <CardHeader
                    title={this.props.task.name}
                    subtitle={'Priority: ' + this.props.task.priority}
                />
                <CardActions>
                    <RaisedButton label="Edit" onClick={this.editTask} />
                    <RaisedButton label="Delete" onClick={this.deleteTask} />
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