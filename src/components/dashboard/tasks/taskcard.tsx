import * as React from 'react';
import { Task } from '../../../store/models/task';
import { CardActions, Card, CardHeader, CardText } from 'material-ui/Card';
import * as moment from 'moment';
import { RaisedButton, FlatButton } from 'material-ui';
import { FaCheck, FaSpinner } from 'react-icons/lib/fa';
import { TaskCompletion } from '../../../store/models/task_completion';
import { observer } from 'mobx-react';
import { parseLocale } from '../../../domain/formatter/localeParser';

@observer
export class TaskCard extends React.Component<{ completeTask: any, task: Task, current_user_id: number, deleteTaskCompletion: any }, { loading: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
        this.completeTask.bind(this);
    }

    deleteTaskCompletion = (completion: TaskCompletion) => {
        this.props.deleteTaskCompletion(completion);
    }
    render() {
        let completions = this.props.task.completions.map((completion, index) => (
            <CompletionRow key={index} completion={completion} deleteTaskCompletion={this.deleteTaskCompletion} current_user_id={this.props.current_user_id} />
        ));
        let latest_completion = null;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[0];
            latest_completion = <div><b> Last done by: </b> {comp.name}  - {moment(moment(comp.created_at).subtract(30, 'seconds')).fromNow()}</div>;
        } else {
            latest_completion = <div>Never done yet </div>;
        }
        let prio = (this.props.task.priority ? 'Priority: ' + moment.duration(this.props.task.priority, 'hours').humanize() : 'No priority set.');
        return (
            <Card style={{ width: '400px', margin: '10px 10px' }}>
                <CardHeader
                    title={this.props.task.name}
                    subtitle={prio}
                    showExpandableButton={true}
                    actAsExpander={true}
                />
                <CardText>
                    {latest_completion}
                </CardText>
                <CardActions>
                    <CompleteButton taskName={this.props.task.name} loading={this.state.loading} label="Complete" completeTask={this.completeTask} />
                </CardActions>
                <CardText expandable={true}>
                    <p><b>Latest completions</b></p>
                    {completions}
                </CardText>
            </Card>
        );
    }

    completeTask = () => {
        this.setState({ loading: true });
        this.props.completeTask(this.props.task).then(() => {
            this.setState({ loading: false });
        });
    }

}

class CompletionRow extends React.Component<{ completion: TaskCompletion, current_user_id: number, deleteTaskCompletion: any }, { completed: boolean }> {
    getHumanDate = (dateString: Date) => {
        let language = navigator.language;
        let date = new Date(dateString);
        return date.toLocaleString(parseLocale());
    }

    deleteTaskCompletion = () => {
        this.props.deleteTaskCompletion(this.props.completion);
    }
    render() {
        return (
            <div>
                <p>{this.props.completion.name}<br />
                    @ {this.getHumanDate(this.props.completion.created_at)} </p>
                {this.props.completion.user_id === this.props.current_user_id ?
                    <FlatButton primary={true} style={{ float: 'right', marginTop: '-50px' }} label="Delete" onTouchTap={this.deleteTaskCompletion} />
                    : null}
                <hr />
            </div>
        );
    }
}

class CompleteButton extends React.Component<{ loading: boolean, label: string, completeTask: any, taskName: string }, { completed: boolean }> {

    handle: any;

    constructor(props: any) {
        super(props);
        this.state = {
            completed: false
        };
    }

    render() {
        let classIdentifier = 'complete_task_button_' + this.props.taskName.replace(/\ /g, '_');
        if (this.props.loading) {
            return (
                <RaisedButton className={classIdentifier} disabled={true}><FaSpinner style={{ color: 'red' }} className="fa-spin" /></RaisedButton>
            );
        } else if (this.state.completed) {
            return (
                <RaisedButton className={classIdentifier} disabled={true}><FaCheck style={{ color: 'green' }} /></RaisedButton>
            );
        } else {
            return (
                <RaisedButton className={classIdentifier} label={this.props.label} onClick={this.completeTask} />
            );
        }
    }

    componentWillUnmont() {
        if (this.handle) {
            clearTimeout(this.handle);
        }
    }

    completeTask = () => {
        this.setState({ completed: true });
        this.props.completeTask();
        this.handle = setTimeout(() => {
            this.setState({ completed: false });
            // tslint:disable-next-line:align
        }, 5000);
    }

}