import * as React from 'react';
import { compose } from 'recompose';
import { observer } from 'mobx-react';
import ExpansionPanel from 'material-ui/ExpansionPanel/ExpansionPanel';
import ExpansionPanelDetails from 'material-ui/ExpansionPanel/ExpansionPanelDetails';
import { WithStyles } from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button/Button';
import Dialog from 'material-ui/Dialog/Dialog';
import { TaskCreator } from '../../admin-panel/task-management/taskcreator';
import { Task } from '../../../../store/models/task';
import { decorate, style } from '../../../../theme';
import { KolhoosiFullScreenDialog } from '../../../util/container/kolhoosi-fullscreen-dialog';
import { IconButton, Divider, ExpansionPanelSummary, Typography } from 'material-ui';
import { MdSave } from 'react-icons/lib/md';
import { TaskCompletionRow } from '../task-completion-row';
import { FaLevelDown } from 'react-icons/lib/fa';

interface TaskDetailsMobileComponentProps {
    task: Task;
    admin: boolean;
    deleteTask: any;
    submitTask: any;
}

interface TaskDetailsMobileComponentState {
    dialogOpen: boolean;
}

class TaskDetailsMobileComponentImpl extends React.Component<TaskDetailsMobileComponentProps & WithStyles, TaskDetailsMobileComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    toggleDialog = () => {
        this.setState({ dialogOpen: !this.state.dialogOpen });
    }
    openDialog = () => {
        this.setState({ dialogOpen: true });
    }

    deleteTask = () => {
        let confirmation = confirm('Are you sure you want to delete the task?\nThis cant be undone and completions will be removed');
        if (confirmation) {
            this.props.deleteTask(this.props.task);
        }
    }

    saveTask = (task?: Task) => {
        this.props.submitTask(this.props.task);
    }

    render() {
        const rows = this.props.task.completions.map((completion, index) => (
            <TaskCompletionRow showDelete={true} completion={completion} key={index} deleteCompletion={null} />
        ));
        let actions = null;
        if (this.props.admin) {
            actions = (
                <div className="classes.column" style={{ float: 'right' }}>
                    <Button onClick={this.openDialog} >Edit</Button>
                    <Button style={{ color: this.props.theme.palette.error.dark }} onClick={this.deleteTask}>Delete</Button>
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center', width: '100%' }}>
                <ExpansionPanel defaultExpanded={false}>
                <ExpansionPanelSummary expandIcon={<FaLevelDown />}>
                    <div className={this.props.classes.column}>
                        <Typography className={this.props.classes.heading}>Recent Completions</Typography>
                    </div>
                </ExpansionPanelSummary>    
                    <ExpansionPanelDetails>
                            {rows}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                {actions}
                <KolhoosiFullScreenDialog
                    open={this.state.dialogOpen}
                    onClose={this.toggleDialog}
                    title={'Edit ' + this.props.task.name}
                    rightAction={this.saveTask}
                    rightActionIcon={<MdSave />}
                    closeAfterAction={true}
                    contentStyle={{ padding: '1em' }}
                >
                    <TaskCreator editedTask={this.props.task} submitTask={this.saveTask} loading={false} />
                </KolhoosiFullScreenDialog >
            </div >
        );
    }
}

export const TaskDetailsMobileComponent = compose<TaskDetailsMobileComponentProps, any>(
    decorate,
    style,
    observer
)(TaskDetailsMobileComponentImpl);

export default TaskDetailsMobileComponent;