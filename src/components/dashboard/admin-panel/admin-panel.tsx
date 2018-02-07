import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer, inject } from 'mobx-react';
import UserManagementComponent from './user-management/user-management';
import TaskManagement from './task-management/task-management';
import CommuneEditor from './commune-editor/commune-editor';
import DashboardItemContainer from '../../util/container/dashboard-item-container';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { WithStyles } from 'material-ui/styles/withStyles';

class AdminPanel extends React.Component<{ mainState: MainState } & WithStyles, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default compose<{ mainState: MainState }, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(AdminPanel);