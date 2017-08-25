import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
// import { TaskCard } from './taskcard';
import { Task } from '../../../store/models/task';
import { Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, RaisedButton } from 'material-ui';
import * as moment from 'moment';

@inject('mainState')
@observer
export class TasksComponent extends React.Component<{ mainState: MainState }, { dialogOpen: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    componentDidMount() {
        this.props.mainState.taskState.getTasks();
    }

    render() {

        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskRow completeTask={this.completeTask} task={task} key={index} />
        ));
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <Table
                    multiSelectable={false}
                    selectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableHeaderColumn>Task</TableHeaderColumn>
                        <TableHeaderColumn>Should be done</TableHeaderColumn>
                        <TableHeaderColumn>Last done by</TableHeaderColumn>
                        <TableHeaderColumn>Complete</TableHeaderColumn>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {tasks}
                    </TableBody>
                </Table>
            </LoadingScreen>
        );
    }

    // render() {
    //     let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
    //         <TaskCard completeTask={this.completeTask} task={task} key={index}/>
    //     ));
    //     return (
    //         <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
    //         <div className="full-size-component"  >
    //             <h4>Tasks</h4>
    //             <div style={{display: 'flex', justifyContent: 'center',  flexWrap: 'wrap', flexDirection: 'row'}}>
    //                 {tasks}
    //             </div>
    //         </div>
    //         </LoadingScreen>
    //     );
    // }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}
@observer
export class TaskRow extends React.Component<{ task: Task, completeTask: any }, {}> {

    render() {
        let latest_completion = null;
        let when_to_do = null;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[this.props.task.completions.length - 1];
            latest_completion = comp.name;
            when_to_do = moment(comp.created_at).add(this.props.task.priority, 'minutes').fromNow();
        } else {
            latest_completion = <div>Never done yet </div>;
        }

        return (
            <TableRow>
                <TableRowColumn>{this.props.task.name}</TableRowColumn>
                <TableRowColumn>{when_to_do}</TableRowColumn>
                <TableRowColumn>{latest_completion}</TableRowColumn>
                <TableRowColumn><RaisedButton label="Complete" onTouchTap={this.completeTask} /></TableRowColumn>
            </TableRow>
        );
    }

    completeTask = () => {
        this.props.completeTask(this.props.task).then(() => {

        });
    }
}


export class CompleteButton extends React.Component<{ loading: boolean, completed: boolean }, {}> {

    render() {
        if (this.props.completed) {
            return (

            )
        } else if (this.props.loading) {
            return (

            )
        } else {
            return (
                
            )
        }

    }
}