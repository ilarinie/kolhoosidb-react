import * as React from 'react';
import { MainState } from '../../../store/state';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { PurchaseCreator } from './purchasecreator';
import { Purchase } from '../../../store/models/purchase';
import { Table, TableRow, TableHeaderColumn, TableHeader, TableBody, TableRowColumn } from 'material-ui';

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
                <TableRow key={index}>
                    <TableRowColumn>{user.name}</TableRowColumn>
                    <TableRowColumn>{user.total}</TableRowColumn>
                    <DiffColumn diff={(user.total - this.props.mainState.communeState.selectedCommune.budget.commune_avg)} />
                </TableRow>
            ));
        }

        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                <div className="full-size-component" >
                    <h4> Purchases </h4>
                    <h4> Total Purchases: {this.props.mainState.communeState.selectedCommune.budget.commune_total} </h4>
                    <h4> Average per user: {this.props.mainState.communeState.selectedCommune.budget.commune_avg} </h4>
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
                    {creator}
                </div>
            </LoadingScreen>
        );
    }

    submitPurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.createPurchase(purchase);
    }
}

class DiffColumn extends React.Component<{diff: number}, {}> {

    rowStyle;

    constructor(props: any) {
        super(props);
        if (this.props.diff < 0){
            this.rowStyle = {
                background: 'red'
            };
        } else {
            this.rowStyle = {
                background: 'green'
            };
        }
    }
    
    render() {
        return(
            <TableRowColumn style={this.rowStyle}>{this.props.diff}</TableRowColumn>
        );
    }
}