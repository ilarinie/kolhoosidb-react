import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { TaskCard } from './taskcard';
import { Task } from '../../../store/models/task';

@inject('mainState')
@observer
export class TasksComponent extends React.Component<{ mainState: MainState }, {loading: boolean, dialogOpen: boolean} > {

    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            dialogOpen: false
        };
    }

    componentDidMount() {
        this.props.mainState.taskState.getTasks().then(() => this.setState({loading: false}));
    }

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskCard completeTask={this.completeTask} task={task} key={index}/>
        ));
        return (
            <LoadingScreen loading={this.state.loading}>
            <div className="full-size-component"  >
                <h4>Tasks</h4>
                <div style={{display: 'flex', justifyContent: 'center',  flexWrap: 'wrap', flexDirection: 'row'}}>
                    {tasks}
                </div>
            </div>
            </LoadingScreen>
        );
    }

    completeTask = (task: Task): Promise<any> => {
       return  this.props.mainState.taskState.completeTask(task);
    }
}