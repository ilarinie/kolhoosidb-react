import * as React from 'react';
import { MainState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';
import { CommuneCreationComponent } from './communecreator';
import { LoadingScreen } from '../../util/loading-screen';
import { Commune } from '../../../store/models/commune';
import { Redirect } from 'react-router-dom';
import { ComponentThemeWrapper } from '../../util/componentThemeWrapper';
import { User } from '../../../store/models/user';

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
            (
                <CommuneCard
                    setDefaultCommune={this.setDefaultCommune}
                    key={index}
                    commune={commune}
                    selectCommune={this.selectCommune}
                    deleteCommune={this.deleteCommune}
                    defaultCommuneId={this.props.mainState.userState.current_user.default_commune_id}
                />
            )
        );
        return (
            <ComponentThemeWrapper uiState={this.props.mainState.uiState}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {communes}
                </div>
                <div style={{ margin: '0 auto', padding: '20px', width: '350px', maxWidth: '99vw' }}>
                    <h3>No commune? No problem.</h3>
                    <CommuneCreationComponent submitCommune={this.submitCommune} loading={this.props.mainState.uiState.communesLoading} />
                </div>
            </ComponentThemeWrapper>
        );
    }

    selectCommune = (commune: Commune) => {
        this.props.mainState.communeState.selectCommune(commune.id);
    }

    setDefaultCommune = (commune: Commune) => {
        this.props.mainState.userState.updateUser({ default_commune_id: commune.id } as User);
    }

    deleteCommune = (commune: Commune) => {
        this.props.mainState.communeState.deleteCommune(commune.id);
    }

    submitCommune = (commune: Commune) => {
        this.props.mainState.communeState.createCommune(commune);
    }
}