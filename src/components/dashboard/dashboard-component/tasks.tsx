import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
// import { TaskCard } from './taskcard';
import { Task } from '../../../store/models/task';
// import { Table, TableHeader, TableBody, TableRow, TableRowColumn, TableHeaderColumn, RaisedButton } from 'material-ui';
import * as moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

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
                        {tasks}
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
        let when_to_do = null;
        let completed = false;
        let late = true;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[this.props.task.completions.length - 1];
            when_to_do = 'Should be done in ' + moment(comp.created_at).add(this.props.task.priority, 'hours').fromNow();
            completed = (new Date(comp.created_at).getTime() + 1000 ) > Date.now();
            late = moment(comp.created_at).add(this.props.task.priority, 'hours').isAfter();
        }
        if (!late) {
            when_to_do = 'Late';
        }

        return (
            <div>
                {this.props.task.name}<br />
                <small>{when_to_do}</small><br />
                <CompleteButton
                    loading={this.props.loading}
                    onTouchTap={this.completeTask}
                    completed={completed}
                    label="DO"
                />
                <hr />
            </div>
        );
    }

    completeTask = () => {
             this.props.completeTask(this.props.task);
     }
}

export interface CompleteButtonProps {
    loading:  boolean;
    label: string;
    onTouchTap: any;
    completed: any;
}

export class CompleteButton extends React.Component<CompleteButtonProps,  {}> {

    render() {
        if (this.props.completed) {
            return (
                <RaisedButton style={{ float: 'right', marginTop: '-37px' }} disabled={true} ><i className="fa fa-check" style={{color: 'green'}}/></RaisedButton>
            );
        } else if (this.props.loading) {
            return (
                <RaisedButton style={{ float: 'right', marginTop: '-37px' }}  disabled={true}><i className="fa fa-spinner fa-spin" style={{ color: 'yellow'}}/></RaisedButton>
            );
        } else {
            return (
                <RaisedButton style={{ float: 'right', marginTop: '-37px' }} label={this.props.label} onTouchTap={this.props.onTouchTap} />
            );
        }

    }
}