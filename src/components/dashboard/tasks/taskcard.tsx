import * as React from 'react';
import { Task } from '../../../store/models/task';
import { CardActions, Card, CardHeader, CardContent, ExpansionPanelActions, Divider, ExpansionPanelDetails, ExpansionPanelSummary, Typography, WithStyles } from 'material-ui';
import * as moment from 'moment';
import { Button } from 'material-ui';
import { FaCheck, FaSpinner } from 'react-icons/lib/fa';
import { TaskCompletion } from '../../../store/models/task_completion';
import { observer } from 'mobx-react';
import { parseLocale } from '../../../domain/formatter/localeParser';
import { CompleteButton } from '../dashboard-component/dashboard-tasks';
import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import { decorate, style } from '../../../theme';
import { compose } from 'recompose';
import { FaLevelDown } from 'react-icons/lib/fa';
import { TaskDetailsMobileComponent } from './task-details-mobile/task-details-mobile';

class TaskCard extends React.Component<{ completeTask: any, task: Task, current_user_id: number, deleteTaskCompletion: any } & WithStyles, { loading: boolean }> {

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
            <ExpansionPanel style={{ width: '100%' }} defaultExpanded={false}>
                <ExpansionPanelSummary expandIcon={<FaLevelDown />}>
                    <div className={this.props.classes.column}>
                        <Typography className={this.props.classes.heading}>{this.props.task.name}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.details}>
                    <TaskDetailsMobileComponent admin={true} task={this.props.task} />
                </ExpansionPanelDetails>
            </ExpansionPanel>

            // <Card style={{ width: '400px', margin: '10px 10px' }}>
            //     <CardHeader
            //         title={this.props.task.name}
            //     >
            //         <small>{prio}</small>
            //     </CardHeader>
            //     <CardContent>
            //         {latest_completion}
            //     </CardContent>
            //     <CardActions>
            //         <CompleteButton taskName={this.props.task.name} loading={this.state.loading} label="Complete" completeTask={this.completeTask} />
            //     </CardActions>
            //     <CardContent >

            //     </CardContent>
            // </Card>
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
                    <Button style={{ float: 'right', marginTop: '-50px' }} onClick={this.deleteTaskCompletion} >Delete</Button>
                    : null}
                <hr />
            </div>
        );
    }
}

export default compose<any, any>(
    decorate,
    style,
    observer,
)(TaskCard);
