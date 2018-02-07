import * as React from 'react';
import { User } from '../../../store/models/user';
import { Link } from 'react-router-dom';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import RefundRow from '../purchases/refund-row';
import { FaUser } from 'react-icons/lib/fa';
import { Commune } from '../../../store/models/commune';
import { observer, inject } from 'mobx-react';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui';
import { decorate } from '../../../theme';
import { LoadingScreen } from '../../util/loading-screen';

interface DashboardUserInfoProps {
    user: User;
    commune: Commune;
    acceptRefund?: any;
    cancelRefund?: any;
    rejectRefund?: any;
}

class DashboardUserInfo extends React.Component<DashboardUserInfoProps & WithStyles, {}> {
    render() {
        let invitations = this.props.user.invitations.map((invitation, index) => (
            <span key={index}>Invited to {invitation.commune_name} <Link to="/profile">Go</Link></span>
        ));
        if (invitations.length === 0) {
            invitations = null;
        }
        let sent_refunds;
        if (!this.props.commune.sent_refunds || this.props.commune.sent_refunds.length === 0) {
            sent_refunds = null;
        } else {
            sent_refunds = this.props.commune.sent_refunds.map((refund, index) => (
                <RefundRow
                    classIdentifier=""
                    key={index}
                    refund={refund}
                    sent={true}
                    handleCancel={this.props.cancelRefund}
                />
            ));
        }
        let received_refunds;
        if (!this.props.commune.received_refunds || this.props.commune.received_refunds.length === 0) {
            received_refunds = null;
        } else {
            received_refunds = this.props.commune.received_refunds.map((refund, index) => (
                <RefundRow
                    classIdentifier=""
                    key={index}
                    refund={refund}
                    sent={false}
                    handleAccept={this.props.acceptRefund}
                    handleReject={this.props.rejectRefund}
                />
            ));
        }
        return (
            <div>
                <LoadingScreen loading={this.props.user == null}>
                    <small>Logged in as</small><br />
                    <p>
                        <FaUser /> {this.props.user.name}
                    </p>
                    {invitations ? <h5>Invitations</h5> : null}
                    {invitations}
                    {sent_refunds ? <h5>Sent refunds:</h5> : null}
                    {sent_refunds}
                    {received_refunds ? <h5>Received refunds:</h5> : null}
                    {received_refunds}
                </LoadingScreen>
            </div>
        );
    }
}

export default compose<DashboardUserInfoProps & WithStyles, any>(
    decorate,
    observer,
)(DashboardUserInfo);