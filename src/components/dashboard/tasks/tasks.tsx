import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { TaskCard } from './taskcard';
import { Task } from '../../../store/models/task';

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

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskCard completeTask={this.completeTask} task={task} key={index}/>
        ));
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
            <div className="full-size-component"  >
                <h1>Tasks</h1>
                <div style={{display: 'flex',  flexWrap: 'wrap'}}>
                    {tasks}
                </div>
            </div>
            </LoadingScreen>
        );
    }

    completeTask = (task: Task): Promise<any> => {
        return this.props.mainState.taskState.completeTask(task);
    }
}