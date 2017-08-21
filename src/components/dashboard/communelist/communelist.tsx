import * as React from 'react';
import { MainState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';
import { CommuneCreationComponent } from './communecreator';
import { LoadingScreen } from '../../util/loading-screen';
import { Commune } from '../../../store/models/commune';
import { Redirect } from 'react-router-dom';

@inject('mainState')
@observer
export class Communelist extends React.Component<{ mainState: MainState }, {}> {
    
    componentDidMount() {
        if (!this.props.mainState.communeState.communeSelected) {
            this.props.mainState.communeState.getCommunes();
        }
    }

    render() {
        if (this.props.mainState.communeState.communeSelected) {
            return <Redirect to="/" />;
        }

        let communes = this.props.mainState.communeState.communes.map((commune, index) => 
            <CommuneCard key={index} commune={commune} selectCommune={this.selectCommune} deleteCommune={this.deleteCommune} />
        );
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {communes}
                </div>
                <CommuneCreationComponent submitCommune={this.submitCommune} />
            </LoadingScreen>
        );
    }

    selectCommune = (commune: Commune) => {
        this.props.mainState.communeState.selectCommune(commune);
    }

    deleteCommune = (commune: Commune) => {
        this.props.mainState.communeState.deleteCommune(commune.id);
    }

    submitCommune = (commune: Commune) => {
        this.props.mainState.communeState.createCommune(commune);
    }
}