import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { DashboardTasksComponent } from './tasks';
import { DashboardPurchasesComponent } from './dashboard_purchases';
import { DashboardActivityFeed } from './dashboard_activity_feed';
import { DashboardUserInfo } from './dashboard_userinfo';

@inject('mainState')
@observer
export class DashboardComponent extends React.Component<{mainState: MainState}, {} > {

    mainContainerStyles = {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap'
    };

    getFeed = () => {
        this.props.mainState.communeState.getFeed();
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <div style={this.mainContainerStyles}>
                    <DashboardItemContainer title="Tasks">
                        <DashboardTasksComponent mainState={this.props.mainState} />
                    </DashboardItemContainer>
                    <DashboardItemContainer title="Budget">
                        <DashboardPurchasesComponent mainState={this.props.mainState}/>
                    </DashboardItemContainer>
                    <DashboardItemContainer title="Activity feed">
                            <DashboardActivityFeed 
                                feed={this.props.mainState.communeState.selectedCommune.feed}
                                getFeed={this.getFeed}
                            />
                    </DashboardItemContainer>
                    <DashboardItemContainer title="Info">
                        <DashboardUserInfo user={this.props.mainState.userState.current_user} />
                    </DashboardItemContainer>    
                </div>
            </div>
        );
    }
}

export class DashboardItemContainer extends React.Component<{title: string}, {}> {

    innerContainerStyles = {
        margin: '10px 10px',
        width: '450px',
        border: '0.5px solid lightgray',
        borderRadius: '5px',
    };

    innerContainerHeaderStyles = {
        textAlign: 'center',
        background: '#FF0025',
        borderRadius: '5px',
        paddingTop: '5px',
        color: 'white'
    };

    innerContainerContentStyles = {
        padding: '20px',
        overflowY: 'auto' as 'auto',
        maxHeight: '300px'
    };
    
    render() {
        return (
            <div style={this.innerContainerStyles}>
            <div
                id="otsikkorivi"
                style={this.innerContainerHeaderStyles}
            >
                {this.props.title}
                <hr />
            </div>
            <div style={this.innerContainerContentStyles}>
                {this.props.children}
            </div>
        </div>
        );
    }
}