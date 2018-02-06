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
import { IconButton, Divider } from 'material-ui';
import { MdSave } from 'react-icons/lib/md';

interface TaskDetailsMobileComponentProps {
    task: Task;
    admin: boolean;
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
    }

    render() {
        let actions = null;
        if (this.props.admin) {
            actions = (
                <div className="classes.column" style={{ float: 'right' }}>
                    <Button onClick={this.openDialog} >Edit</Button>
                    <Button style={{ color: this.props.theme.palette.error.dark }} onClick={() => { console.log('delete'); }}>Delete</Button>
                </div>
            );
        }
        return (
            <div style={{ textAlign: 'center', width: '100%' }}>

                <Divider />
                {actions}
                <KolhoosiFullScreenDialog
                    open={this.state.dialogOpen}
                    onClose={this.toggleDialog}
                    title={'Edit ' + this.props.task.name}
                    rightAction={() => { console.log('saved'); }}
                    rightActionIcon={<MdSave />}
                    closeAfterAction={true}
                >
                    <TaskCreator editedTask={this.props.task} submitTask={() => { console.log('subm'); }} loading={false} />
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