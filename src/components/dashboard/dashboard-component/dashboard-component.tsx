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
import { Paper } from 'material-ui';

@inject('mainState')
@observer
export class DashboardComponent extends React.Component<{ mainState: MainState }, {}> {

    mainContainerStyles = {
        display: 'flex',
        alignItems: 'flex-start' as 'flex-start',
        alignContent: 'flex-start' as 'flex-start',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start' as 'flex-start',
        minHeight: '100vh',
        background: this.props.mainState.uiState.getKolhoosiTheme().palette.canvasColor,
        maxWidth: '1200px',
        maxHeight: '100vh'
    };

    componentDidMount() {
        this.props.mainState.uiState.getDashboardContents();
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
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Info" flexGrow={1}>
                        <DashboardUserInfo
                            user={this.props.mainState.userState.current_user}
                            acceptRefund={this.acceptRefund}
                            cancelRefund={this.cancelRefund}
                            rejectRefund={this.rejectRefund}
                        />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Tasks" flexGrow={7}>
                        <DashboardTasksComponent mainState={this.props.mainState} />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Budget" flexGrow={7}>
                        <DashboardPurchasesComponent mainState={this.props.mainState} />
                    </DashboardItemContainer>
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Activity feed" flexGrow={1}>
                        <DashboardActivityFeed
                            feed={this.props.mainState.communeState.selectedCommune.feed}
                            getFeed={this.getFeed}
                        />
                    </DashboardItemContainer>
                    <DashboardItemContainer
                        flexGrow={1}
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

export class DashboardItemContainer extends React.Component<{ title: string, uiState: UiState, flexGrow: number }, { open: boolean }> {

    innerContainerStyles = {
        flexGrow: this.props.flexGrow as number,
        margin: '10px 10px',
        minWidth: '200px',
        maxWidth: '500px',
        border: '0.5px solid lightgray',
        borderColor: this.props.uiState.getKolhoosiTheme().palette.borderColor,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        // flex: '1 auto'
    };

    innerContainerHeaderStyles = {
        font: 'Times New Roman',
        textAlign: 'center',
        background: this.props.uiState.getKolhoosiTheme().palette.primary1Color,
        // background: '-webkit-linear-gradient(90deg, rgba(255,0,37,1) 0%, rgba(222,15,0,1) 100%)',
        paddingTop: '5px',
        color: 'white',
        minHeight: '40px',
        fontSize: '18px'
    };

    innerContainerContentStyles = {
        padding: '10px',
        overflowY: 'auto' as 'auto',
        minHeight: '300px',
        maxHeight: '300px',
        color: this.props.uiState.getKolhoosiTheme().palette.textColor,
        background: this.props.uiState.getKolhoosiTheme().palette.canvasColor
    };

    constructor(props: any) {
        super(props);
        this.state = {
            open: true
        };
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
            <Paper style={this.innerContainerStyles}>
                <div
                    id="otsikkorivi"
                    style={this.innerContainerHeaderStyles}
                >
                    <div style={{ marginTop: '5px' }}>
                        {this.props.title}
                    </div>
                    <div style={{ float: 'right', marginRight: '10px' }}>
                        <span style={{ cursor: 'pointer' }} onClick={this.toggleOpen}>_</span>
                    </div>

                </div>
                <div style={this.getInnerContainerContentStyles()}>
                    {this.props.children}
                </div>
            </Paper>
        );
    }
}