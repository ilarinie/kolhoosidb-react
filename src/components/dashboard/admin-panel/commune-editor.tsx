import * as React from 'react';
import { MainState } from '../../../store/state';
import { observer } from 'mobx-react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Commune } from '../../../store/models/commune';
import { SubmitButton } from '../../util/submit-button';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';

@observer
export class CommuneEditor extends React.Component<{mainState: MainState}, {commune: Commune, loading: boolean}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            commune: this.props.mainState.communeState.selectedCommune,
            loading: false
        };
        this.handleChange.bind(this);
    }

    handleChange = (event: any) => {
        let commune  = this.state.commune;
        commune[event.target.name] = event.target.value;
        this.setState({commune: commune});
    }

    render() {
        let cats = null;
        if (this.props.mainState.communeState.selectedCommune.purchase_categories) {
            cats = this.props.mainState.communeState.selectedCommune.purchase_categories.map((cat, index) => (
                <li key={index}>{cat.name}</li>
            ));
        }

        const commune = this.state.commune;
        return (
            <div>
            <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator
                    floatingLabelText="Commune name"
                    name="name"
                    type="text"
                    value={commune.name}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['Name is requred']}
                /><br />
                <TextValidator
                    floatingLabelText="Commune description"
                    name="description"
                    type="text"
                    multiLine={true}
                    rows={2}
                    value={commune.description}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['Description is requred']}
                /><br />
                <SubmitButton loading={this.state.loading} label="Save" type="submit" />
            </ValidatorForm>
            <h4> Add purchase category </h4>
            <PurchaseCategoryCreator createCategory={this.createCategory} />
            <h4> Categories </h4>
            <ul>
                {cats}
            </ul>
            </div>
        );
    }

    createCategory = (purchaseCategory: PurchaseCategory) => {
        this.props.mainState.purchaseState.createPurchaseCategory(purchaseCategory);
    }

    handleSubmit = () => {
        this.setState({loading: true});
        this.props.mainState.communeState.updateCommune(this.state.commune).then(() => {
            this.setState({loading: false});
        });
    }

}

export class PurchaseCategoryCreator extends React.Component<{createCategory: any}, {purchaseCategory: PurchaseCategory}>{
    constructor(props: any) {
        super(props);
        let category: any = {};
        category.name = '';
        this.state = {
            purchaseCategory: category
        };
    }

    render() {
        return (
            <div>
                <TextField
                    name="name"
                    type="text"
                    value={this.state.purchaseCategory.name}
                    id="cat"
                    onChange={this.handleChange}
                />
                <RaisedButton label="Create" onTouchTap={this.createCategory} />
            </div>
        );
    }

    handleChange = (event) => {
        const { purchaseCategory } = this.state;
        purchaseCategory[event.target.name] = event.target.value;
        this.setState({purchaseCategory});
    }

    createCategory = () => {
        this.props.createCategory(this.state.purchaseCategory);
    }
}