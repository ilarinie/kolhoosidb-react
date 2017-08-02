import { AppState } from '../../store/state';
import * as React from 'react';

export class TasksComponent extends React.Component<{ appState: AppState }, {} > {
    render() {
        return (
            <div>
                Taskeja Taskeja
            </div>
        );
    }
}