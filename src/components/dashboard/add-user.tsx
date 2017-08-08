import { AppState } from '../../store/state';
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingScreen } from '../util/loading-screen';

@inject('appState')
@observer
export class AddUserComponent extends React.Component<{ appState: AppState }, {}>{
    render() {
        return (
            <LoadingScreen loading={this.props.appState.dataLoading}>
                <div>
                   <h4> Here be going to be the asd </h4>
                </div>
            </LoadingScreen>
        );
    }
}