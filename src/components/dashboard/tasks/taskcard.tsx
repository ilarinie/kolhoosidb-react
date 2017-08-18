import * as React from 'react';
import { Task } from '../../../store/models/task';
import { CardActions, Card, CardHeader, CardText } from 'material-ui/Card';
import * as moment from 'moment';
import { RaisedButton } from 'material-ui';

export class TaskCard extends React.Component<{completeTask: any, task: Task}, {loading: boolean} > {

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
            latest_completion = <div><b> Last done by: </b> {comp.name}  - {moment(comp.created_at).fromNow()}</div>;
        } else {
            latest_completion = <div>Never done yet </div>;
        }
        return (
            <Card style={{ width: '400px', margin: '20px auto' }}>
            <CardHeader
                title={this.props.task.name}
                subtitle={'Priority: ' + this.props.task.priority}
                actAsExpander={true}
            />
            <CardText>
                {latest_completion}
            </CardText>
            <CardActions>
                <CompleteButton loading={this.state.loading} label="Complete" completeTask={this.completeTask} />
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
        this.setState({loading: true});
        this.props.completeTask(this.props.task).then(() => {
            this.setState({loading: false});
        });
    }

}

class CompleteButton extends React.Component<{loading: boolean, label: string, completeTask: any}, {completed: boolean} > {

    constructor(props: any) {
        super(props);
        this.state = {
            completed: false
        };
    }

    render() {
        if (this.props.loading) {
            return (
                <RaisedButton disabled={true}><i style={{color: 'red'}} className="fa fa-star fa-spin" /></RaisedButton>
            );
        } else if (this.state.completed) {
            return (
                <RaisedButton  disabled={true}><i style={{color: 'green'}} className="fa fa-check"/></RaisedButton>
            );
        } else {
            return (
                <RaisedButton label={this.props.label} onTouchTap={this.completeTask} />
            );   
        }
    }

    completeTask = () => {
        this.setState({completed: true});
        this.props.completeTask();
        setTimeout(() => {
            this.setState({completed: false});
        },         5000);
    }

}