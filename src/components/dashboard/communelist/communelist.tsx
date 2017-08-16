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
export class Communelist extends React.Component<{ mainState: MainState }, {loading: boolean}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
        // This is kind of a hack, we want the communelist to redirect to 
        setTimeout(() => {
            if (!this.props.mainState.communeState.communeSelected) {
                this.setState({loading: true});
                this.props.mainState.communeState.getCommunes().then(() => {
                    this.setState({loading: false});
                });
                }
        },         500);

    }

    render() {
        if (this.props.mainState.communeState.communeSelected) {
            return <Redirect to="/" />;
        }

        let communes = this.props.mainState.communeState.communes.map((commune, index) => 
            <CommuneCard key={index} commune={commune} selectCommune={this.selectCommune} deleteCommune={this.deleteCommune} />
        );
        return (
            <LoadingScreen loading={this.state.loading}>
            <div>
                    {communes}
                <hr />
                <CommuneCreationComponent submitCommune={this.submitCommune} />
            </div>
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