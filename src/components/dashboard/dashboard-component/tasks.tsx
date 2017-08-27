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
export class DashboardTasksComponent extends React.Component<{ mainState: MainState }, { dialogOpen: boolean }> {

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
            <TaskRow
                completeTask={this.completeTask}
                task={task}
                key={index}
                loading={this.props.mainState.taskState.taskLoading === task.id}
        /> 
        ));
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <div style={{width: '500px', margin: '0 auto'}}>
                <Table
                    multiSelectable={false}
                    selectable={false}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>        
                            <TableHeaderColumn>Task</TableHeaderColumn>
                            <TableHeaderColumn>Should be done</TableHeaderColumn>
                            <TableHeaderColumn>Last done by</TableHeaderColumn>
                            <TableHeaderColumn>Complete</TableHeaderColumn>
                        </TableRow>        
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {tasks}
                    </TableBody>
                </Table>
                </div>
            </LoadingScreen>
        );
    }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}
@observer
export class TaskRow extends React.Component<{ task: Task, completeTask: any, loading: boolean }, {loading: boolean, completed: boolean}> {

    render() {
        let latest_completion = null;
        let when_to_do = null;
        let completed = false;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[this.props.task.completions.length - 1];
            latest_completion = comp.name;
            when_to_do = moment(comp.created_at).add(this.props.task.priority, 'hours').fromNow();
            completed = (new Date(comp.created_at).getTime() + 1000 ) > Date.now();
        } else {
            latest_completion = <div>Never done yet </div>;
        }

        return (
            <TableRow>
                <TableRowColumn>{this.props.task.name}</TableRowColumn>
                <TableRowColumn>{when_to_do}</TableRowColumn>
                <TableRowColumn>{latest_completion}</TableRowColumn>
                <TableRowColumn>
                    <CompleteButton 
                        label="Complete"
                        onTouchTap={this.completeTask}
                        loading={this.props.loading}
                        completed={completed}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    completeTask = () => {
             this.props.completeTask(this.props.task);
    }
}

export interface CompleteButtonProps {
    loading: boolean;
    label: string;
    onTouchTap: any;
    completed: any;
}

export class CompleteButton extends React.Component<CompleteButtonProps, {}> {

    render() {
        if (this.props.completed) {
            return (
                <RaisedButton style={{width: '100px'}} disabled={true} ><i className="fa fa-check" style={{color: 'green'}}/></RaisedButton>
            );
        } else if (this.props.loading) {
            return (
                <RaisedButton style={{width: '100px'}}  disabled={true}><i className="fa fa-spinner fa-spin" style={{ color: 'yellow'}}/></RaisedButton>
            );
        } else {
            return (
                <RaisedButton style={{width: '100px'}} label={this.props.label} onTouchTap={this.props.onTouchTap} />
            );
        }

    }
}