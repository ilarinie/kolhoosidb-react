import * as React from 'react';
import { MainState } from '../../../store/state';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { PurchaseCreator } from './purchasecreator';
import { Purchase } from '../../../store/models/purchase';
import { Table, TableRow, TableHeaderColumn, TableHeader, TableBody, TableRowColumn } from 'material-ui';
import { TotalColumn } from '../../util/total-column';
import { DiffColumn } from '../../util/diff-column';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import { ComponentThemeWrapper } from '../../util/componentThemeWrapper';
import { RefundPanel } from './refunds';
import { PurchaseList } from './purchaselist';
import { BudgetRow } from '../dashboard-component/dashboard_purchases';
import { DashboardItemContainer } from '../../util/container/dashboard-item-container';

@inject('mainState')
@observer
export class PurchasesComponent extends React.Component<{ mainState: MainState }, {}> {

    mainContainerStyles = {
        display: 'flex',
        alignItems: 'flex-start' as 'flex-start',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start' as 'flex-start',
        minHeight: '100vh',
        maxWidth: '100vw',
        padding: '0px',
        background: this.props.mainState.uiState.getKolhoosiTheme().palette.canvasColor
    };

    componentDidMount() {
        this.props.mainState.purchaseState.getBudget();
        this.props.mainState.purchaseState.getPurchases();
    }

    render() {
        let creator = null;
        if (this.props.mainState.communeState.selectedCommune.purchase_categories && this.props.mainState.communeState.selectedCommune.purchase_categories.length !== 0) {
            creator = (
                <PurchaseCreator
                    categories={this.props.mainState.communeState.selectedCommune.purchase_categories}
                    submitPurchase={this.submitPurchase}
                    expandable={true}
                />
            );
        }

        let rows = null;
        rows = this.props.mainState.communeState.selectedCommune.budget.users.map((user, index) => (
            <BudgetRow
                user={user}
                key={index}
                diff={(user.total - this.props.mainState.communeState.selectedCommune.budget.commune_avg)}
            />
        ));

        return (

            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <ComponentThemeWrapper uiState={this.props.mainState.uiState}>
                    <div style={this.mainContainerStyles}>
                        <DashboardItemContainer padding="0" uiState={this.props.mainState.uiState} title="Purchases" maxHeight="1000px">
                            <PurchaseList
                                purchases={this.props.mainState.communeState.selectedCommune.purchases}
                                current_user_id={this.props.mainState.userState.current_user.id}
                                deletePurchase={this.deletePurchase}
                                totalPurchases={this.props.mainState.communeState.selectedCommune.budget.commune_total}
                                averagePurchase={this.props.mainState.communeState.selectedCommune.budget.commune_avg}
                            />
                        </DashboardItemContainer>
                        <DashboardItemContainer maxHeight="600px" title="Refunds" uiState={this.props.mainState.uiState} >
                            <RefundPanel mainState={this.props.mainState} />
                        </DashboardItemContainer>
                        <DashboardItemContainer padding="30px" uiState={this.props.mainState.uiState} title="budget" width="600px">
                            {rows}
                        </DashboardItemContainer>
                        <DashboardItemContainer uiState={this.props.mainState.uiState} title="New purchase">
                            {creator}
                        </DashboardItemContainer>
                    </div>
                </ComponentThemeWrapper>
            </LoadingScreen>
        );
    }

    submitPurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.createPurchase(purchase);
    }

    deletePurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.deletePurchase(purchase);
    }
}
