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

    innerContainerStyles = {
        margin: '10px 10px',
        width: '500px',
        padding: '20px',
        border: '0.5px solid lightgray',
        borderRadius: '5px'
    };

    getFeed = () => {
        this.props.mainState.communeState.getFeed();
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <h1 style={{margin: '20px'}}>KolhoosiDB Dashboard</h1>
                <div style={this.mainContainerStyles}>
                    <div style={this.innerContainerStyles}>
                        <DashboardUserInfo user={this.props.mainState.userState.current_user} />
                    </div>    
                    <div style={this.innerContainerStyles}>
                        <h4>Tasks</h4>
                        <DashboardTasksComponent mainState={this.props.mainState}/>
                    </div>
                    <div style={this.innerContainerStyles}>
                        <h4>Budget</h4>
                        <DashboardPurchasesComponent mainState={this.props.mainState}/>
                        </div>
                    <div style={this.innerContainerStyles}>
                            <DashboardActivityFeed 
                                feed={this.props.mainState.communeState.selectedCommune.feed}
                                getFeed={this.getFeed}
                            />
                    </div>    
                </div>
            </div>
        );
    }
}