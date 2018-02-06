import * as React from 'react';
import { MainState } from '../../../store/state';
import LoadingScreen from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import PurchaseCreator from './purchasecreator';
import { Purchase } from '../../../store/models/purchase';
import { TotalColumn } from '../../util/total-column';
import { DiffColumn } from '../../util/diff-column';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import RefundPanel from './refunds';
import PurchaseList from './purchaselist';
import { BudgetRow } from '../dashboard-component/dashboard_purchases';
import DashboardItemContainer from '../../util/container/dashboard-item-container';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { ThemeWrapper } from '../../util/theme-wrapper';

class PurchasesComponent extends React.Component<{ mainState: MainState } & WithStyles, {}> {

    mainContainerStyles = {
        display: 'flex',
        alignItems: 'flex-start' as 'flex-start',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start' as 'flex-start',
        padding: '0px',
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
                    loading={this.props.mainState.uiState.purchaseLoading}
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

                <ThemeWrapper>
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
                        <DashboardItemContainer maxHeight="1000px" title="Refunds" uiState={this.props.mainState.uiState} >
                            <RefundPanel mainState={this.props.mainState} />
                        </DashboardItemContainer>
                        <DashboardItemContainer padding="30px" uiState={this.props.mainState.uiState} title="budget" width="600px">
                            {rows}
                        </DashboardItemContainer>
                        <DashboardItemContainer uiState={this.props.mainState.uiState} title="New purchase">
                            {creator}
                        </DashboardItemContainer>
                    </div>
                </ThemeWrapper>
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
export default compose<{ mainState: MainState } & WithStyles, any>(
    decorate,
    style,
    inject('mainState'),
    observer,
)(PurchasesComponent);