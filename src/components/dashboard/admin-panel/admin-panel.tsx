import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer, inject } from 'mobx-react';
import { UserManagementComponent } from './user-management/user-management';
import { Tabs, Tab } from 'material-ui';
import { TaskManagement } from './task-management/task-management';
import { CommuneEditor } from './commune-editor/commune-editor';
import { ComponentThemeWrapper } from '../../util/componentThemeWrapper';

@inject('mainState')
@observer
export class AdminPanel extends React.Component<{ mainState: MainState }, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <ComponentThemeWrapper uiState={this.props.mainState.uiState} >
                <Tabs>
                    <Tab label="User Management">
                        <UserManagementComponent mainState={this.props.mainState} />
                    </Tab>
                    <Tab className="task-management-tab" label="Task Management">
                        <TaskManagement mainState={this.props.mainState} />
                    </Tab>
                    <Tab label="Commune Management">
                        <CommuneEditor mainState={this.props.mainState} />
                    </Tab>
                </Tabs>
            </ComponentThemeWrapper>
        );
    }
}