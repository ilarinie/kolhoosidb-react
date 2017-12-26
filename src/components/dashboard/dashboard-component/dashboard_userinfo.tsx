import * as React from 'react';
import { User } from '../../../store/models/user';
import { Link } from 'react-router-dom';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';

export class DashboardUserInfo extends React.Component<{ user: User }, {}> {
    render() {
        let invitations = this.props.user.invitations.map((invitation, index) => (
            <span key={index}>Invited to {invitation.commune_name} <Link to="/profile">Go</Link></span>
        ));
        if (invitations.length === 0) {
            invitations = null;
        }
        let sent_refunds = this.props.user.sent_refunds.map((refund, index) => (
            <span key={index}>To: {refund.to} - {currencyFormatter.format(refund.amount)}</span>
        ));
        if (sent_refunds.length === 0) {
            sent_refunds = null;
        }
        let received_refunds = this.props.user.received_refunds.map((refund, index) => (
            <span key={index}>From: {refund.from} - {currencyFormatter.format(refund.amount)} </span>
        ));
        if (received_refunds.length === 0) {
            received_refunds = null;
        }

        return (
            <div>
                <b>Logged in as</b> {this.props.user.name}
                {invitations ? <h5>Invitations</h5> : null}
                {invitations}
                {sent_refunds ? <h5>Sent refunds:</h5> : null}
                {sent_refunds}
                {received_refunds ? <h5>Received refunds:</h5> : null}
                {received_refunds}
            </div>
        );
    }
}