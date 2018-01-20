import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { TaskCard } from './taskcard';
import { Task } from '../../../store/models/task';
import { ComponentThemeWrapper } from '../../util/componentThemeWrapper';
import { TaskCompletion } from '../../../store/models/task_completion';

@inject('mainState')
@observer
export class TasksComponent extends React.Component<{ mainState: MainState }, { dialogOpen: boolean }> {

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

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskCard
                deleteTaskCompletion={this.deleteTaskCompletion}
                current_user_id={this.props.mainState.userState.current_user.id}
                completeTask={this.completeTask}
                task={task}
                key={index}
            />
        ));
        return (
            <ComponentThemeWrapper uiState={this.props.mainState.uiState}>
                {/* <LoadingScreen loading={this.props.mainState.uiState.dataLoading}> */}
                <div className="full-size-component"  >
                    <h1>Tasks</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tasks}
                    </div>
                </div>
                {/* </LoadingScreen> */}
            </ComponentThemeWrapper>
        );
    }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}