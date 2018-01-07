import { Refund } from '../../../store/models/refund';
import * as React from 'react';
import { FlatButton, RaisedButton, Paper } from 'material-ui';
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
                <div>
                    <div
                        style={{ padding: '10px' }}
                    >
                        <table style={{ width: '100%', fontSize: '15px', color: '#424242' }}>
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>To</th><th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: '200px' }}>{this.props.refund.to}</td>
                                    <td>{currencyFormatter.format(this.props.refund.amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ float: 'right' }} >
                                <FlatButton primary={true} className={'cancel_' + this.props.classIdentifier + '_button'} onClick={this.handleCancel} label="Cancel" />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        } else {
            return (
                <div>
                    <div style={{ padding: '10px' }}>
                        <table style={{ width: '100%', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>From</th><th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.refund.from}</td>
                                    <td>{currencyFormatter.format(this.props.refund.amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ float: 'right' }} >
                                <FlatButton
                                    labelStyle={{ color: 'green' }}
                                    className={'accept_' + this.props.classIdentifier + '_button'}
                                    label="Accept"
                                    onClick={this.handleAccept}
                                />
                                <FlatButton
                                    primary={true}
                                    className={'reject_' + this.props.classIdentifier + '_button'}
                                    onClick={this.handleReject}
                                    label="Reject"
                                />
                            </div>
                        </div>
                    </div>
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