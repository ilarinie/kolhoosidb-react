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
import { DashboardItemContainer } from '../dashboard-component/dashboard-component';
import { RefundPanel } from './refunds';
import { PurchaseList } from './purchaselist';

@inject('mainState')
@observer
export class PurchasesComponent extends React.Component<{ mainState: MainState }, {}> {

    mainContainerStyles = {
        display: 'flex',
        alignItems: 'flex-start' as 'flex-start',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start' as 'flex-start',
        minHeight: '100vh',
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
        if (this.props.mainState.communeState.selectedCommune.budget && this.props.mainState.communeState.selectedCommune.budget.users) {
            rows = this.props.mainState.communeState.selectedCommune.budget.users.map((user, index) => (
                <TableRow key={index}>
                    <TableRowColumn>{user.name}</TableRowColumn>
                    <TotalColumn total={user.total} />
                    <DiffColumn diff={(user.total - this.props.mainState.communeState.selectedCommune.budget.commune_avg)} />
                </TableRow>
            ));
        }

        return (

            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <ComponentThemeWrapper uiState={this.props.mainState.uiState}>
                    <div style={this.mainContainerStyles}>
                        <DashboardItemContainer padding="0" uiState={this.props.mainState.uiState} title="Purchases" maxHeight="600px">
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
                        <DashboardItemContainer padding="0" uiState={this.props.mainState.uiState} title="budget" width="600px">
                            <Table>
                                <TableHeader
                                    displaySelectAll={false}
                                    enableSelectAll={false}
                                    adjustForCheckbox={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Total Purchases</TableHeaderColumn>
                                        <TableHeaderColumn>Differential</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                    stripedRows={false}
                                >
                                    {rows}
                                </TableBody>
                            </Table><br />
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
