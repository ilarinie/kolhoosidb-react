import * as React from 'react';
import { MainState } from '../../../store/state';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { PurchaseCreator } from './purchasecreator';
import { Purchase } from '../../../store/models/purchase';

@inject('mainState')
@observer
export class PurchasesComponent extends React.Component<{ mainState: MainState }, {}> {

    componentDidMount() {
        this.props.mainState.purchaseState.getBudget();
    }

    render() {
        let creator = null;
        if (this.props.mainState.communeState.selectedCommune.purchase_categories && this.props.mainState.communeState.selectedCommune.purchase_categories.length !== 0) {
            creator = (
                <PurchaseCreator categories={this.props.mainState.communeState.selectedCommune.purchase_categories} submitPurchase={this.submitPurchase} />
            );
        }

        let rows = null;
        if (this.props.mainState.communeState.selectedCommune.budget && this.props.mainState.communeState.selectedCommune.budget.users) {
            rows = this.props.mainState.communeState.selectedCommune.budget.users.map((user, index) => (
                <li key={index}> {user.name}   -   {user.total}     -   {(user.total - this.props.mainState.communeState.selectedCommune.budget.commune_avg)} </li>
            ));
        }

        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <div>
                    <h4> Purchases </h4>
                    <h4> Total Purchases: {this.props.mainState.communeState.selectedCommune.budget.commune_total} </h4>
                    <h4> Average per user: {this.props.mainState.communeState.selectedCommune.budget.commune_avg} </h4>
                    <ul>
                        {rows}
                    </ul>
                    {creator}
                </div>
            </LoadingScreen>
        );
    }

    submitPurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.createPurchase(purchase);
    }
}