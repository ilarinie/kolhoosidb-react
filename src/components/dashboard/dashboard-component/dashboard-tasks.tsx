import { MainState } from '../../../store/state';
import * as React from 'react';
import LoadingScreen from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { Task } from '../../../store/models/task';
import * as moment from 'moment';
import { Button } from 'material-ui';
import { FaUser, FaStar, FaCheck, FaStarO } from 'react-icons/lib/fa';
import { sortTasks } from '../../../domain/task-sorter';
import { MdArrowDropDown } from 'react-icons/lib/md';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui';
import { decorate, style } from '../../../theme';

interface DashboardTasksComponentProps {
    mainState: MainState;
}
class DashboardTasksComponent extends React.Component<DashboardTasksComponentProps & WithStyles, { dialogOpen: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    componentDidMount() {
        // this.props.mainState.taskState.getTasks();
    }

    render() {
        let orderedTasks = sortTasks(this.props.mainState.communeState.selectedCommune.tasks);
        let tasks = orderedTasks.map((task, index) => (
            <TaskRow
                completeTask={this.completeTask}
                task={task}
                key={index}
                loading={this.props.mainState.taskState.taskLoading === task.id}
            />
        ));
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <div style={{ width: '100%' }}>
                    {tasks}
                </div>
            </LoadingScreen>
        );
    }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}

export default compose<DashboardTasksComponentProps & WithStyles, any>(
    decorate,
    observer,
)(DashboardTasksComponent);

interface TaskRowComponentProps {
    task: Task;
    completeTask: any;
    loading: boolean;
}
class TaskRowComponent extends React.Component<TaskRowComponentProps & WithStyles, { display: string }> {

    constructor(props: any) {
        super(props);
        this.state = {
            display: 'hidden'
        };
    }

    toggleDetails = () => {
        if (this.state.display === 'hidden') {
            this.setState({ display: 'inline-block' });
        } else {
            this.setState({ display: 'hidden' });
        }
    }

    render() {
        let when_to_do = null;
        let completed = false;
        let late = false;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[0];
            if (this.props.task.priority) {
                when_to_do = 'Should be done ' + moment(comp.created_at).add(this.props.task.priority, 'hours').fromNow();
                late = moment(comp.created_at).add(this.props.task.priority, 'hours').isAfter();
            } else {
                when_to_do = 'No priority set.';
            }

            completed = (new Date(comp.created_at).getTime() + 10000) > new Date().getTime();

        }
        if (!late) {
            when_to_do = <span style={{ color: '#E64A19' }}>Late</span>;
        }
        if (!this.props.task.priority) {
            when_to_do = null;
        }

        return (
            <div style={{ width: '100%' }}>
                <div style={{ float: 'left', padding: '10px' }}>
                    <span style={{ width: '100%', height: '100%', cursor: 'pointer' }} onClick={this.toggleDetails} >
                        {this.state.display === 'hidden' ? <FaStarO /> : <FaStar />}
                    </span>
                </div>
                <div
                    style={{
                        width: '100%',
                        maxWidth: '200px'
                    }}
                >
                    <span
                        style={{ maxWidth: '100px', fontVariant: 'small-caps', }}
                    >
                        {this.props.task.name}
                    </span><br />
                    <span style={{ maxWidth: '100%', fontVariant: 'small-caps', wordWrap: 'break-word', display: 'inline-block' }} ><small>{when_to_do}</small></span> <br />
                </div>
                <CompleteButton
                    identifier={this.props.task.name.trim()}
                    loading={this.props.loading}
                    onClick={this.completeTask}
                    completed={completed}
                    label="DO"
                />
                <TaskDetails task={this.props.task} visibility={this.state.display} />
                <hr
                    style={{
                        height: '10px',
                        border: 0,
                        boxShadow: '0 10px 10px -10px #8c8c8c inset'
                    }}
                />
            </div >
        );
    }

    completeTask = () => {
        this.props.completeTask(this.props.task);
    }
}

const TaskRow = compose<TaskRowComponentProps, any>(
    decorate,
    style,
    observer,
)(TaskRowComponent);

const taskDetailsHeaderStyle = {
    fontSize: '12px',
    color: 'gray'
};

const TaskDetails = props => {

    let lastCompletion = null;
    if (props.task.completions[0]) {
        lastCompletion = (
            <span>{props.task.completions[0].name}<br /> <small>({moment(props.task.completions[0].created_at).fromNow()})</small></span>
        );
    } else {
        lastCompletion = 'No one (yet)';
    }

    if (props.visibility === 'hidden') {
        return null;
    } else {
        return (
            <div style={{ padding: '10px', margin: '0 auto', textAlign: 'center' }}>
                <p style={taskDetailsHeaderStyle}>Last done by</p>
                <div style={{ margin: '0 auto' }}>
                    <FaUser style={{ marginRight: '10px' }} />{lastCompletion}
                </div>
                <p style={taskDetailsHeaderStyle}>Awards</p>
                <span>{props.task.reward ? props.task.reward : 'No'} points</span><br />
                <p style={taskDetailsHeaderStyle}>Should be done</p>
                <span
                    style={{ wordWrap: 'break-word', display: 'inline-block' }}
                >
                    {props.task.priority ? 'Every ' + moment.duration(props.task.priority, 'hours').humanize() : 'Whenever neccesary'}
                </span>
            </div>
        );
    }

};

interface CompleteButtonProps {
    loading: boolean;
    label: string;
    onClick: any;
    completed: boolean;
    identifier: string;
}

class CompleteButtonComponent extends React.Component<CompleteButtonProps, {}> {
    styles = {
        float: 'right',
        marginTop: '-37px',
        marginRight: '0.5em',
    };
    render() {
        if (this.props.completed) {
            return (
                <Button
                    raised={true}
                    className={this.props.identifier}
                    style={this.styles}
                    disabled={true}
                >
                    <FaCheck style={{ color: 'green' }} />
                </Button>
            );
        } else if (this.props.loading) {
            return (
                <Button
                    raised={true}
                    className={this.props.identifier}
                    style={this.styles}
                    disabled={true}
                >
                    <FaStar style={{ color: 'red' }} className="fa-spin" />
                </Button>
            );
        } else {
            return (
                <Button
                    raised={true}
                    className={this.props.identifier}
                    style={this.styles}
                    onClick={this.props.onClick}
                > {this.props.label}
                </Button>
            );
        }

    }
}
export const CompleteButton = compose<CompleteButtonProps, any>(
    style,
    decorate,
    observer
)(CompleteButtonComponent);