import * as React from 'react';
import { AppState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';
import { CommuneCreationComponent } from './communecreator';

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
            <div>
                <ul>
                    {communes}
                </ul>
                <hr />
                <CommuneCreationComponent appState={this.props.appState} />
            </div>
        );
    }
}