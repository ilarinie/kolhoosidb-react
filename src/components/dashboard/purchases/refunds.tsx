import * as React from 'react';
import { Refund } from '../../../store/models/refund';
import { User } from '../../../store/models/user';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import RefundRow from './refund-row';
import { FaEur } from 'react-icons/lib/fa';
import SubmitButton from '../../util/submit-button';
import RefundCreator from './refundcreator';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui';
import { decorate, style } from '../../../theme';

interface RefundPanelProps {
    mainState: MainState;
}

class RefundPanel extends React.Component<RefundPanelProps & WithStyles, {}> {

    componentDidMount() {
        this.props.mainState.userState.getUsers();
    }

    cancelRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.cancelRefund(refund);
    }

    acceptRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.acceptRefund(refund);
    }

    rejectRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.rejectRefund(refund);
    }

    submitRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.createRefund(refund);
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
        let sent_refunds = this.props.mainState.selCommune().sent_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={true} handleCancel={this.cancelRefund} />
        ));
        let received_refunds = this.props.mainState.selCommune().received_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={false} handleAccept={this.acceptRefund} handleReject={this.rejectRefund} />
        ));
        return (
            <div>
                <div style={{ margin: '0 auto', overflow: 'auto', height: '350px', width: '400px' }}>
                    <p>New refund</p>
                    <RefundCreator users={combined} handleSubmit={this.submitRefund} loading={this.props.mainState.uiState.purchaseLoading} />
                </div>
                <hr />
                <div style={{ padding: '20px' }}>
                    <p>Sent Refunds</p>
                    {sent_refunds}
                </div>
                <hr />
                <div style={{ padding: '20px' }}>
                    <p>Received Refunds</p>
                    {received_refunds}
                </div>

            </div>
        );
    }
}
export default compose<RefundPanelProps, any>(
    decorate,
    style,
    observer,
)(RefundPanel);