import { MainState } from '../../../store/state';
import * as React from 'react';
import LoadingScreen from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import TaskCard from './taskcard';
import { Task } from '../../../store/models/task';
import { TaskCompletion } from '../../../store/models/task_completion';
import { WithStyles } from 'material-ui';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { ThemeWrapper } from '../../util/theme-wrapper';

class TasksComponent extends React.Component<{ mainState: MainState } & WithStyles, { dialogOpen: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            dialogOpen: false
        };
    }

    componentDidMount() {
        this.props.mainState.taskState.getTasks();
    }

    deleteTaskCompletion = (completion: TaskCompletion) => {
        this.props.mainState.taskState.deleteTaskCompletion(completion);
    }

    updateTask = (task: Task) => {
        this.props.mainState.taskState.updateTask(task);
    }

    deleteTask = (task: Task) => {
        this.props.mainState.taskState.deleteTask(task);
    }

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskCard
                deleteTaskCompletion={this.deleteTaskCompletion}
                current_user={this.props.mainState.userState.current_user}
                current_user_admin={this.props.mainState.communeState.selectedCommune.current_user_admin}
                completeTask={this.completeTask}
                task={task}
                key={index}
                deleteTask={this.deleteTask}
                submitTask={this.updateTask}
            />
        ));
        return (
            <ThemeWrapper>
                <div style={{ padding: '1em' }}>
                    <h1>Tasks</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tasks}
                    </div>
                </div>
            </ThemeWrapper>
        );
    }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}

export default compose<{ mainState: MainState } & WithStyles, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(TasksComponent);