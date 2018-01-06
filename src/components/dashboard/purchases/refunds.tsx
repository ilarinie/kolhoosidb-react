import * as React from 'react';
import { Refund } from '../../../store/models/refund';
import { Paper, RaisedButton, MenuItem, SelectField, FlatButton } from 'material-ui';
import { User } from '../../../store/models/user';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RefundRow } from './refund-row';
import { FaEur } from 'react-icons/lib/fa';

interface RefundPanelProps {
    mainState: MainState;
}
@inject('mainState')
@observer
export class RefundPanel extends React.Component<RefundPanelProps, {}> {

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
        let sent_refunds = this.props.mainState.userState.current_user.sent_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={true} handleCancel={this.cancelRefund} />
        ));
        let received_refunds = this.props.mainState.userState.current_user.received_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={false} handleAccept={this.acceptRefund} handleReject={this.rejectRefund} />
        ));
        return (
            <div>
                <RefundCreator users={combined} handleSubmit={this.submitRefund} />
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

interface RefundCreatorProps {
    handleSubmit: any;
    users: User[];
}

export class RefundCreator extends React.Component<RefundCreatorProps, { refund: any }> {

    containerStyles = {
        padding: '0px 20px',
        height: '150px'
    };

    headerStyles = {
        fontSize: '15px',
        paddingTop: '15px',
        marginBottom: '-15px'
    };

    constructor(props: any) {
        super(props);
        let refund: any = {};
        refund.to = '';
        refund.amount = '';
        this.state = {
            refund: refund
        };
    }

    handleUserChange = (event, index, value) => {
        const { refund } = this.state;
        refund.to = value;
        this.setState({ refund: refund });
    }

    handleChange = (event: any) => {
        const { refund } = this.state;
        refund[event.target.name] = event.target.value;
        this.setState({ refund: refund });
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.refund);
    }

    render() {
        const { refund } = this.state;
        let users = null;
        if (this.props.users.length !== 0) {
            users = this.props.users.map((user, index) => {
                let kebabName = user.name.replace(/\ /g, '_');
                return (
                    <MenuItem className={'user-' + kebabName} key={index} value={user.id} primaryText={user.name} />
                );
            });
        }
        return (
            <div style={this.containerStyles}>
                <p style={this.headerStyles}>New refund</p>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <SelectField
                        className="user-selector"
                        floatingLabelText="To"
                        value={refund.to}
                        onChange={this.handleUserChange}
                        style={{ float: 'left', width: '150px', marginRight: '20px' }}
                    >
                        {users}
                    </SelectField>
                    <TextValidator
                        name="amount"
                        type="number"
                        floatingLabelText="Amount"
                        onChange={this.handleChange}
                        value={refund.amount}
                        style={{ width: '150px' }}
                        validators={['required']}
                    />
                    <FaEur style={{ marginLeft: '20px', fontSize: '20px', color: 'gray' }} />
                    <br />
                    <FlatButton style={{ float: 'right', color: 'green' }} className="submit-refund-button" label="Create" type="submit" />
                </ValidatorForm>
            </div>
        );
    }
}