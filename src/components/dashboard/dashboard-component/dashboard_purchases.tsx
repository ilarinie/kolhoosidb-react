import * as React from 'react';
import { MainState } from '../../../store/state';
import LoadingScreen from '../../util/loading-screen';
import { observer, inject } from 'mobx-react';
import { Purchase } from '../../../store/models/purchase';
import { Dialog, Button } from 'material-ui';
import PurchaseCreator from '../purchases/purchasecreator';
import { TotalColumn } from '../../util/total-column';
import { DiffColumn } from '../../util/diff-column';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import { FaPlus, FaUser } from 'react-icons/lib/fa';
import KolhoosiDialog from '../../util/container/kolhoosidialog';
import RefundCreator from '../purchases/refundcreator';
import { Refund } from '../../../store/models/refund';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';

interface DashboardPurchasesComponentProps {
    mainState: MainState;
    hideButtons?: boolean;
}

class DashboardPurchasesComponent extends React.Component<DashboardPurchasesComponentProps & WithStyles, { dialogOpen: boolean }> {

    constructor(props: any) {
        super(props);
        this.handleClose.bind(this);
    }

    handleClose = () => {
        this.props.mainState.uiState.purchaseDialogOpen = false;
    }

    handleRefundClose = () => {
        this.props.mainState.uiState.refundDialogOpen = false;
    }

    handleRefundSubmit = (refund: Refund) => {
        this.props.mainState.purchaseState.createRefund(refund);
    }

    openRefundDialog = () => {
        this.props.mainState.uiState.refundDialogOpen = true;
    }

    openDialog = () => {
        this.props.mainState.uiState.purchaseDialogOpen = true;
    }

    componentDidMount() {
        // this.props.mainState.purchaseState.getBudget();
    }

    render() {
        let newUsers = [];
        newUsers = this.props.mainState.userState.users.filter((el) => {
            return el.id !== this.props.mainState.userState.current_user.id;
        });
        let newAdmins = [];
        newAdmins = this.props.mainState.userState.admins.filter((el) => {
            return el.id !== this.props.mainState.userState.current_user.id;
        });
        let combined = newUsers.concat(newAdmins);
        let creator = null;
        if (!this.props.hideButtons &&
            this.props.mainState.communeState.selectedCommune.purchase_categories &&
            this.props.mainState.communeState.selectedCommune.purchase_categories.length !== 0) {
            creator = (
                <div>
                    <Button
                        raised={true}
                        className="new-purchase-button"
                        style={{ width: '100%', margin: '0 auto', padding: '10px' }}
                        onClick={this.openDialog}
                    >
                        <FaPlus /> Add a Purchase
                    </Button>
                    <Button
                        raised={true}
                        className="new-refund-button"
                        style={{ width: '100%', margin: '0 auto', padding: '10px' }}
                        onClick={this.openRefundDialog}
                    >
                        <FaPlus /> Send a refund
                    </Button>
                    <KolhoosiDialog
                        open={this.props.mainState.uiState.purchaseDialogOpen}
                        title="Create a purchase"
                        handleClose={this.handleClose}
                    >
                        <PurchaseCreator
                            categories={this.props.mainState.communeState.selectedCommune.purchase_categories}
                            submitPurchase={this.submitPurchase}
                            expandable={false}
                            loading={this.props.mainState.uiState.purchaseLoading}
                        />

                    </KolhoosiDialog>
                    <KolhoosiDialog
                        open={this.props.mainState.uiState.refundDialogOpen}
                        title="Send a refund"
                        handleClose={this.handleRefundClose}
                    >
                        <RefundCreator
                            handleSubmit={this.handleRefundSubmit}
                            users={combined}
                            loading={this.props.mainState.uiState.purchaseLoading}
                        />
                    </KolhoosiDialog>

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

export default compose<DashboardPurchasesComponentProps, any>(
    decorate,
    style,
    observer,
)(DashboardPurchasesComponent);

export class BudgetRow extends React.Component<{ user: any, diff: any }, {}> {
    constructor(props: any) {
        super(props);
    }

    getDiffColor() {
        if (this.props.diff < 0 && -20 < this.props.diff) {
            return '#AFB42B';
        } else if (this.props.diff < 0) {
            return '#E64A19';
        } else {
            return '#689F38';
        }
    }

    render() {
        let total = currencyFormatter.format(this.props.user.total);
        let diff = currencyFormatter.format(this.props.diff);
        let diffxplanation = null;
        if (this.props.diff < 0) {
            diffxplanation = 'To pay:';
        } else if (this.props.diff > 0) {
            diffxplanation = 'To receive:';
        } else {
            diffxplanation = 'Even';
        }
        return (
            <div style={{ padding: '5px' }}>
                <div style={{ float: 'left', height: '100%', color: 'gray', fontSize: '30px', padding: '11px' }}>
                    <FaUser />
                </div>
                {this.props.user.name}<br />
                <small>Total purchases:<br />{total}</small><br />
                <div
                    style={{
                        bordeRadius: '5px',
                        // border: '1px solid lightgray',
                        borderBottom: '0px solid black',

                        textAlign: 'center',
                        // background: 'lightgrey',
                        float: 'right',
                        marginTop: '-60px',
                        width: '150px',
                        maxWidth: '300px',
                        height: '67px',
                        marginLeft: '-1px',
                        lineHeight: '15px'
                    }}
                >
                    <small>{diffxplanation}</small><br />
                    <p
                        style={{ color: this.getDiffColor(), marginTop: '10px', fontSize: '23px', fontFamily: 'inconsolata' }}
                    >
                        <b>{diff}</b>
                    </p>
                </div>
                <hr style={{ border: '0.5px solid gray' }} />
            </div >

        );
    }
}