import * as React from 'react';
import { Task } from '../../../store/models/task';
import { CardActions, Card, CardHeader, CardText } from 'material-ui/Card';
import * as moment from 'moment';
import { RaisedButton } from 'material-ui';
import { FaCheck, FaSpinner } from 'react-icons/lib/fa';

export class TaskCard extends React.Component<{ completeTask: any, task: Task }, { loading: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
        this.completeTask.bind(this);
    }

    render() {
        let completions = this.props.task.completions.map((completion, index) => (
            <li key={index}>{completion.name} - {completion.created_at}</li>
        ));
        let latest_completion = null;
        if (this.props.task.completions.length !== 0) {
            let comp = this.props.task.completions[this.props.task.completions.length - 1];
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
                    <ul>
                        {completions}
                    </ul>
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