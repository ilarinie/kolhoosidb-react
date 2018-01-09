import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { DashboardTasksComponent } from './dashboard-tasks';
import { DashboardPurchasesComponent } from './dashboard_purchases';
import { DashboardActivityFeed } from './dashboard_activity_feed';
import { DashboardUserInfo } from './dashboard_userinfo';
import { UiState } from '../../../store/ui-state';
import { XpScroller } from '../../util/xp-scroller';
import { Refund } from '../../../store/models/refund';
import { DashboardItemContainer } from '../../util/container/dashboard-item-container';

@inject('mainState')
@observer
export class DashboardComponent extends React.Component<{ mainState: MainState }, {}> {

    mainContainerStyles = {
        display: 'flex',
        alignItems: 'flex-start' as 'flex-start',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start' as 'flex-start',
        minHeight: '100vh',
        background: this.props.mainState.uiState.getKolhoosiTheme().palette.canvasColor
    };

    componentDidMount() {
        this.props.mainState.uiState.getDashboardContents(false);
    }

    getFeed = () => {
        this.props.mainState.communeState.getFeed();
    }
    getTopList = () => {
        this.props.mainState.communeState.getTopList();
    }

    acceptRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.acceptRefund(refund);
    }
    cancelRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.cancelRefund(refund);
    }
    rejectRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.rejectRefund(refund);
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={this.mainContainerStyles}>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Info">
                        <DashboardUserInfo
                            user={this.props.mainState.userState.current_user}
                            acceptRefund={this.acceptRefund}
                            cancelRefund={this.cancelRefund}
                            rejectRefund={this.rejectRefund}
                        />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Tasks">
                        <DashboardTasksComponent mainState={this.props.mainState} />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Budget">
                        <DashboardPurchasesComponent mainState={this.props.mainState} />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Activity feed">
                        <DashboardActivityFeed
                            feed={this.props.mainState.communeState.selectedCommune.feed}
                            getFeed={this.getFeed}
                        />
                    </DashboardItemContainer>
                    <DashboardItemContainer
                        uiState={this.props.mainState.uiState}
                        title="Top Lists"
                    >
                        <XpScroller
                            getTopLists={this.getTopList}
                            weekly={this.props.mainState.communeState.weeklyTop}
                            monthly={this.props.mainState.communeState.montlyTop}
                            all_time={this.props.mainState.communeState.allTimeTop}
                        />
                    </DashboardItemContainer>
                </div>
            </div>
        );
    }
}