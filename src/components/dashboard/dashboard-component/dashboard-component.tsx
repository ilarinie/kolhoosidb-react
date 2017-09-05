import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { DashboardTasksComponent } from './tasks';
import { DashboardPurchasesComponent } from './dashboard_purchases';
import { DashboardActivityFeed } from './dashboard_activity_feed';
import { DashboardUserInfo } from './dashboard_userinfo';
import { ThemeSelector } from '../../../App';
import { UiState } from '../../../store/ui-state';

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

    getFeed = () => {
        this.props.mainState.communeState.getFeed();
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div style={this.mainContainerStyles}>
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
                    <DashboardItemContainer uiState={this.props.mainState.uiState} title="Info">
                        <DashboardUserInfo user={this.props.mainState.userState.current_user} />
                    </DashboardItemContainer>
                </div>
            </div>
        );
    }
}

export class DashboardItemContainer extends React.Component<{ title: string, uiState: UiState }, { open: boolean }> {

    innerContainerStyles = {
        margin: '10px 10px',
        width: '450px',
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
        padding: '20px',
        overflowY: 'auto' as 'auto',
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