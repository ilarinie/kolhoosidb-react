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

export class DashboardItemContainer extends React.Component<{ padding?: string, title: string, uiState: UiState, maxHeight?: string, width?: string }, { open: boolean }> {

    maxHeight = this.props.maxHeight ? this.props.maxHeight : '400px';
    width = this.props.width ? this.props.width : '500px';
    padding = this.props.padding ? this.props.padding : '20px';

    innerContainerStyles = {
        margin: '10px 10px',
        width: this.width,
        maxWidth: '95vw',
        border: '0.5px solid lightgray',
        borderColor: this.props.uiState.getKolhoosiTheme().palette.borderColor,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    };

    innerContainerHeaderStyles = {
        textAlign: 'center',
        background: this.props.uiState.getKolhoosiTheme().palette.primary1Color,
        // background: '-webkit-linear-gradient(90deg, rgba(255,0,37,1) 0%, rgba(222,15,0,1) 100%)',
        paddingTop: '5px',
        color: 'white'
    };

    innerContainerContentStyles = {
        padding: this.padding,
        overflowY: 'auto' as 'auto',
        maxHeight: this.maxHeight,
        color: this.props.uiState.getKolhoosiTheme().palette.textColor,
        background: this.props.uiState.getKolhoosiTheme().palette.canvasColor
    };

    constructor(props: any) {
        super(props);
        this.state = {
            open: true
        };
    }

    componentDidMount() {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
            this.innerContainerStyles.width = this.width;
        } else {
            this.innerContainerStyles.width = '95vw';
        }
        mediaQuery.addListener((mq) => {
            if (mq.matches) {
                this.innerContainerStyles.width = this.width;
            } else {
                this.innerContainerStyles.width = '95vw';
            }
        });
    }

    getInnerContainerContentStyles = () => {
        if (this.state.open) {
            return this.innerContainerContentStyles;
        } else {
            return { display: 'none' };
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
        return false;
    }
    render() {
        return (
            <div style={this.innerContainerStyles}>
                <div
                    id="otsikkorivi"
                    style={this.innerContainerHeaderStyles}
                >
                    {this.props.title}
                    <div style={{ float: 'right', marginRight: '10px' }}>
                        <span style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>_</span>
                    </div>
                    <hr />
                </div>
                <div style={this.getInnerContainerContentStyles()}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}