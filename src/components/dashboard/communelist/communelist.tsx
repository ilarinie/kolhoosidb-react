import * as React from 'react';
import { MainState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import CommuneCard from './communecard';
import { CommuneCreationComponent } from './communecreator';
import LoadingScreen from '../../util/loading-screen';
import { Commune } from '../../../store/models/commune';
import { Redirect } from 'react-router-dom';
import { User } from '../../../store/models/user';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui';
import { decorate } from '../../../theme';
import { ThemeWrapper } from '../../util/theme-wrapper';

class Communelist extends React.Component<{ mainState: MainState } & WithStyles, {}> {

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
            <ThemeWrapper>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {communes}
                </div>
                <div style={{ margin: '0 auto', padding: '20px', width: '350px', maxWidth: '99vw' }}>
                    <h3>No commune? No problem.</h3>
                    <CommuneCreationComponent submitCommune={this.submitCommune} loading={this.props.mainState.uiState.communesLoading} />
                </div>
            </ThemeWrapper>
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

export default compose<{ mainState: MainState } & WithStyles, any>(
    decorate,
    inject('mainState'),
    observer,
)(Communelist);