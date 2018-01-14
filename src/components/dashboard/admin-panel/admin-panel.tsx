import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer, inject } from 'mobx-react';
import { UserManagementComponent } from './user-management/user-management';
import { Tabs, Tab } from 'material-ui';
import { TaskManagement } from './task-management/task-management';
import { CommuneEditor } from './commune-editor/commune-editor';
import { ComponentThemeWrapper } from '../../util/componentThemeWrapper';
import { DashboardItemContainer } from '../../util/container/dashboard-item-container';

@inject('mainState')
@observer
export class AdminPanel extends React.Component<{ mainState: MainState }, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <ComponentThemeWrapper uiState={this.props.mainState.uiState} >
                <DashboardItemContainer
                    title="Users"
                    uiState={this.props.mainState.uiState}
                >
                    <UserManagementComponent mainState={this.props.mainState} />
                </DashboardItemContainer>
                <DashboardItemContainer
                    title="Tasks"
                    uiState={this.props.mainState.uiState}
                >
                    <TaskManagement mainState={this.props.mainState} />
                </DashboardItemContainer>
                <DashboardItemContainer
                    title="Commune"
                    uiState={this.props.mainState.uiState}
                >
                    <CommuneEditor mainState={this.props.mainState} />
                </DashboardItemContainer>
            </ComponentThemeWrapper>
        );
    }
}