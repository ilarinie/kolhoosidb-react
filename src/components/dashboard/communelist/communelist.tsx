import * as React from 'react';
import { AppState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';

@inject('appState')
@observer
export class Communelist extends React.Component<{ appState: AppState }, {}> {
    render() {
        let communes = this.props.appState.communes.map((commune, index) => 
            <CommuneCard key={index} commune={commune} value={index} appState={this.props.appState} />
        );
        return (
            <div>
                <ul>
                    {communes}
                </ul>
            </div>
        );
    }

    selectCommune = (id: any) => {
        console.log(id);
        // this.props.appState.selectCommune(id);
    }

    logout = () => {
        this.props.appState.logOut();
    }
}

class CommuneSelector extends React.Component<{value: number, appState: AppState}, {}> {
    render() {
        return (
            <button onClick={this.selectCommune}> Select </button>
        );
    }

    selectCommune = () => {
        this.props.appState.selectCommune(this.props.value);
    }
}