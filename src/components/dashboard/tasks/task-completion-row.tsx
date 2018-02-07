import { Task } from '../../../store/models/task';
import * as React from 'react';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { WithStyles } from 'material-ui';
import { compose } from 'recompose';
import { TaskCompletion } from '../../../store/models/task_completion';
import Button from 'material-ui/Button/Button';

interface TaskCompletionRowProps {
    completion: TaskCompletion;
    showDelete: boolean;
    deleteCompletion: any;
}

const TaskCompletionRowImpl = ( props: TaskCompletionRowProps & WithStyles) => {
    
    const deleteCompletion = () => {
        props.deleteCompletion(props.completion);
    };
    
    let deleteButton = null;
    if (props.showDelete) {
        deleteButton = (
            <Button
                style={{
                    float: 'right',
                    marginTop: '-3.8em'
                }}
                onClick={deleteCompletion}
            >
                Delete
            </Button>
        );
    }
    
    return (
        <div style={{ width: '100%', height: '5em', textAlign: 'left' }}>
            <p style={{ width: '50%' }}> 
                {props.completion.name}<br />
                <small>{props.completion.created_at}</small>
            </p>    
            {deleteButton}
        </div>

    );
};
 
export const TaskCompletionRow = compose<TaskCompletionRowProps,  any>(
    decorate,
    style,
    observer
)(TaskCompletionRowImpl);