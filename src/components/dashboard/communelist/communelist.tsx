import * as React from 'react';
import { AppState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';
import { CommuneCreationComponent } from './communecreator';
import { LoadingScreen } from '../../util/loading-screen';
import { SmallErrorDisplay } from '../../util/small-error-display';

@inject('appState')
@observer
export class Communelist extends React.Component<{ appState: AppState }, {}> {
    
    componentDidMount() {
        this.props.appState.getCommunes();
    }

    render() {
        let communes = this.props.appState.communes.map((commune, index) => 
            <CommuneCard key={index} commune={commune} value={index} appState={this.props.appState} />
        );
        return (
            <LoadingScreen loading={this.props.appState.dataLoading}>
            <div>
                    {communes}
                <hr />
                <CommuneCreationComponent appState={this.props.appState} />
            </div>
            </LoadingScreen>
        );
    }
}