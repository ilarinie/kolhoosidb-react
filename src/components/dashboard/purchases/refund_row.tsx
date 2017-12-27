import { Refund } from '../../../store/models/refund';
import * as React from 'react';
import { RaisedButton, Paper } from 'material-ui';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';

interface RefundRowProps {
    refund: Refund;
    sent: boolean;
    classIdentifier: string;
    handleCancel?: any;
    handleAccept?: any;
    handleReject?: any;
}

export class RefundRow extends React.Component<RefundRowProps, {}> {
    render() {
        if (this.props.sent) {
            return (
                <Paper>
                    <div
                        style={{ padding: '10px' }}
                    >
                        <table style={{ width: '100%', fontSize: '11px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>From</th><th>To</th><th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.refund.from}</td>
                                    <td>{this.props.refund.to}</td>
                                    <td>{currencyFormatter.format(this.props.refund.amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <RaisedButton style={{ float: 'right' }} className={this.props.classIdentifier} onTouchTap={this.handleCancel} label="Cancel" />
                    </div>
                </Paper>
            );
        } else {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>From</th><th>To</th><th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.refund.from}</td>
                                <td>{this.props.refund.to}</td>
                                <td>{currencyFormatter.format(this.props.refund.amount)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <RaisedButton
                        className={'accept_' + this.props.classIdentifier + '_button'}
                        label="Accept"
                        onTouchTap={this.handleAccept}
                    />
                    <RaisedButton
                        className={'reject_' + this.props.classIdentifier + '_button'}
                        onTouchTap={this.handleReject}
                        label="Reject"
                    />
                </div>
            );
        }
    }

    handleCancel = () => {
        this.props.handleCancel(this.props.refund);
    }

    handleAccept = () => {
        this.props.handleAccept(this.props.refund);
    }

    handleReject = () => {
        this.props.handleReject(this.props.refund);
    }
}