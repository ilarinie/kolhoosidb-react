import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer, inject } from 'mobx-react';
import { UserManagementComponent } from './user-management/user-management';
import { Tabs, Tab } from 'material-ui';
import { TaskManagement } from './task-management/task-management';
import { CommuneEditor } from './commune-editor/commune-editor';

@inject('mainState')
@observer
export class AdminPanel extends React.Component<{ mainState: MainState }, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div className="full-size-component">
                <Tabs>
                    <Tab label="User Management">
                        <UserManagementComponent mainState={this.props.mainState} />
                    </Tab>
                    <Tab label="Task Management">
                        <TaskManagement mainState={this.props.mainState} />
                    </Tab>
                    <Tab label="Commune Management">
                        <CommuneEditor mainState={this.props.mainState} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}