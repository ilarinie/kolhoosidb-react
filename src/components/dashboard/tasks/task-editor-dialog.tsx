import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { WithStyles } from 'material-ui/styles/withStyles';
import { Task } from '../../../store/models/task';

interface TaskEditorDialogProps {
    task?: Task;
    saveTask: any;
    open: boolean;
    onClose: any;

}

interface TaskEditorDialogState {

}

class TaskEditorDialogImpl extends React.Component<TaskEditorDialogProps & WithStyles, TaskEditorDialogState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>Comp</div>
        );
    }
}

export const TaskEditorDialog = compose<TaskEditorDialogProps, any>(
    decorate,
    style,
    observer
)(TaskEditorDialogImpl);

export default TaskEditorDialog;