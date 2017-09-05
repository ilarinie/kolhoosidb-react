import * as React from 'react';
import { MainState } from '../../../store/state';
import { LoadingScreen } from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { Purchase } from '../../../store/models/purchase';
import {
    Table,
    TableRow,
    TableHeaderColumn,
    TableHeader,
    TableBody,
    TableRowColumn,
    Dialog,
    RaisedButton
} from 'material-ui';
import { PurchaseCreator } from '../purchases/purchasecreator';
import { TotalColumn } from '../../util/total-column';
import { DiffColumn } from '../../util/diff-column';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { currencyFormatter } from '../../util/currencyFormatter';

@inject('mainState')
@observer
export class DashboardPurchasesComponent extends React.Component<{ mainState: MainState }, { dialogOpen: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = {
            dialogOpen: false
        };
        this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    openDialog = () => {
        this.setState({ dialogOpen: true });
    }

    componentDidMount() {
        this.props.mainState.purchaseState.getBudget();
    }

    render() {
        let creator = null;
        if (this.props.mainState.communeState.selectedCommune.purchase_categories && this.props.mainState.communeState.selectedCommune.purchase_categories.length !== 0) {
            creator = (
                <div>
                    <RaisedButton
                        style={{ width: '100%', margin: '0 auto' }}
                        onTouchTap={this.openDialog}
                    >
                        <i className="fa fa-plus-circle" /> Add a Purchase
                    </RaisedButton>
                    <PurchaseCreatorDialog
                        categories={this.props.mainState.communeState.selectedCommune.purchase_categories}
                        submitPurchase={this.submitPurchase}
                        dialogOpen={this.state.dialogOpen}
                        handleClose={this.handleClose}
                    />
                </div>
            );
        }

        let rows = null;
        if (this.props.mainState.communeState.selectedCommune.budget && this.props.mainState.communeState.selectedCommune.budget.users) {
            rows = this.props.mainState.communeState.selectedCommune.budget.users.map((user, index) => (
                <BudgetRow
                    user={user}
                    key={index}
                    diff={(user.total - this.props.mainState.communeState.selectedCommune.budget.commune_avg)}
                />
            ));
        }

        return (
            <LoadingScreen loading={this.props.mainState.uiState.dataLoading}>
                {rows}
                {creator}
            </LoadingScreen>
        );
    }

    submitPurchase = (purchase: Purchase) => {
        this.props.mainState.purchaseState.createPurchase(purchase);
    }
}

export class BudgetRow extends React.Component<{ user: any, diff: any }, {}> {
    constructor(props: any) {
        super(props);
    }

    getDiffColor() {
        if (this.props.diff < 0 && -20 < this.props.diff) {
            return 'yellow';
        } else if (this.props.diff < 0) {
            return 'red';
        } else {
            return 'green';
        }
    }

    render() {
        let total = currencyFormatter.format(this.props.user.total);
        let diff = currencyFormatter.format(this.props.diff);
        return (
            <div style={{ padding: '5px' }}>
                {this.props.user.name}<br />
                <small>Total purchases: {total}</small><br />
                <p
                    style={{ color: this.getDiffColor(), float: 'right', marginTop: '-27px', fontFamily: 'Lucida Console, Monospace' }}
                >
                    <b>{diff}</b>
                </p>
                <hr />
            </div>

        );
    }
}

interface PurchaseCreatorDialogProps {
    categories: PurchaseCategory[];
    dialogOpen: boolean;
    handleClose: any;
    submitPurchase: any;
}

class PurchaseCreatorDialog extends React.Component<PurchaseCreatorDialogProps, {}> {
    render() {
        return (
            <Dialog
                open={this.props.dialogOpen}
                onRequestClose={this.props.handleClose}
                modal={false}
            >
                <PurchaseCreator expandable={false} categories={this.props.categories} submitPurchase={this.props.submitPurchase} />
            </Dialog>
        );
    }

}