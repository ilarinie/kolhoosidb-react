import { MainState } from '../../store/state';
import * as React from 'react';

export class TasksComponent extends React.Component<{ mainState: MainState }, {} > {
    render() {
        return (
            <div>
                Taskeja Taskeja
            </div>
        );
    }
}