import { Refund } from '../../../store/models/refund';
import * as React from 'react';
import { Button, Paper } from 'material-ui';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { inject, observer } from 'mobx-react';

interface RefundRowProps {
    refund: Refund;
    sent: boolean;
    classIdentifier: string;
    handleCancel?: any;
    handleAccept?: any;
    handleReject?: any;
}

class RefundRow extends React.Component<RefundRowProps & WithStyles, {}> {
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
                                <Button className={'cancel_' + this.props.classIdentifier + '_button'} onClick={this.handleCancel} >Cancel</Button>
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
                                <Button
                                    className={'accept_' + this.props.classIdentifier + '_button'}
                                    onClick={this.handleAccept}
                                >Accept
                                </Button>
                                <Button
                                    className={'reject_' + this.props.classIdentifier + '_button'}
                                    onClick={this.handleReject}
                                >Reject
                                </Button>
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

export default compose<RefundRowProps, any>(
    decorate,
    style,
    observer,
)(RefundRow);