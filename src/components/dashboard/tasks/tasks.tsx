import { MainState } from '../../../store/state';
import * as React from 'react';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { TaskCreator } from './taskcreator';
import { TaskCard } from './taskcard';

@inject('mainState')
@observer
export class TasksComponent extends React.Component<{ mainState: MainState }, {loading: boolean} > {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.props.mainState.taskState.getTasks().then(() => this.setState({loading: false}));
    }

    render() {
        let tasks = this.props.mainState.communeState.selectedCommune.tasks.map((task, index) => (
            <TaskCard mainState={this.props.mainState} task={task} index={index} key={index}/>
        ));

        return (
            <LoadingScreen loading={this.state.loading}>
            <div className="full-size-component" >
                <h4>Tasks</h4>
                {tasks}

                <TaskCreator mainState={this.props.mainState} />
            </div>
            </LoadingScreen>
        );
    }
}