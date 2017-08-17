import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { TaskCreator } from './taskcreator';
import { TaskCard } from './taskcard';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
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
        let addTask = (
            <FloatingActionButton onTouchTap={this.openDialog} >
                <ContentAdd />
            </FloatingActionButton>
        );
        return (
            <LoadingScreen loading={this.state.loading}>
            <div className="full-size-component"  >
                <h4>Tasks</h4>
                {addTask}
                <div style={{display: 'flex', justifyContent: 'center',  flexWrap: 'wrap', flexDirection: 'row'}}>
                    {tasks}
                </div>
                <TaskCreator submitTask={this.submitTask} open={this.state.dialogOpen} />
            </div>
            </LoadingScreen>
        );
    }

    openDialog = () => {
        this.setState({dialogOpen: true});
    }

    submitTask = (task: Task) => {
        this.setState({dialogOpen: false});
        if (task.id) {
            this.props.mainState.taskState.updateTask(task);
        } else {
            this.props.mainState.taskState.createTask(task);
        }
    }

    completeTask = (task: Task): Promise<any> => {
       return  this.props.mainState.taskState.completeTask(task);
    }
}