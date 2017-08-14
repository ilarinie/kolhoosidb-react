import * as React from 'react';
import { MainState } from '../../../store/state';
import { inject, observer } from 'mobx-react';
import { CommuneCard } from './communecard';
import { CommuneCreationComponent } from './communecreator';
import { LoadingScreen } from '../../util/loading-screen';
import { SmallErrorDisplay } from '../../util/small-error-display';

@inject('mainState')
@observer
export class Communelist extends React.Component<{ mainState: MainState }, {}> {
    
    componentDidMount() {
        console.log(this.props.mainState);
        this.props.mainState.communeState.getCommunes();
    }

    render() {
        let communes = this.props.mainState.communeState.communes.map((commune, index) => 
            <CommuneCard key={index} commune={commune} value={index} mainState={this.props.mainState} />
        );
        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
            <div>
                    {communes}
                <hr />
                <CommuneCreationComponent mainState={this.props.mainState} />
            </div>
            </LoadingScreen>
        );
    }
}