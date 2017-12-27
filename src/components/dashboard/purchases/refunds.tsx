import * as React from 'react';
import { Refund } from '../../../store/models/refund';
import { RaisedButton, MenuItem, SelectField } from 'material-ui';
import { User } from '../../../store/models/user';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RefundRow } from './refund_row';

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
        console.log(newUsers.length);
        let newAdmins = [];
        newAdmins = this.props.mainState.userState.admins.filter((el) => {
            return el.id !== this.props.mainState.userState.current_user.id;
        });
        console.log(newAdmins.length);
        let combined = newUsers.concat(newAdmins);
        console.log(combined.length);
        let sent_refunds = this.props.mainState.userState.current_user.sent_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={true} handleCancel={this.cancelRefund} />
        ));
        let received_refunds = this.props.mainState.userState.current_user.received_refunds.map((refund: Refund, index: number) => (
            <RefundRow classIdentifier={index.toString()} refund={refund} key={index} sent={false} handleAccept={this.acceptRefund} handleReject={this.rejectRefund} />
        ));
        return (
            <div>
                <h3>Sent Refunds</h3>
                {sent_refunds}
                <h3>Received Refunds</h3>
                {received_refunds}
                <h3>New Refund</h3>
                <RefundCreator users={combined} handleSubmit={this.submitRefund} />
            </div>
        );
    }
}

interface RefundCreatorProps {
    handleSubmit: any;
    users: User[];
}

export class RefundCreator extends React.Component<RefundCreatorProps, { refund: any }> {

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
            <div>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <SelectField
                        className="user-selector"
                        floatingLabelText="To"
                        value={refund.to}
                        onChange={this.handleUserChange}
                    >
                        {users}
                    </SelectField>
                    <TextValidator
                        name="amount"
                        type="number"
                        floatingLabelText="Amount"
                        onChange={this.handleChange}
                        value={refund.amount}
                    /><br />
                    <RaisedButton className="submit-refund-button" label="Submit" type="submit" />
                </ValidatorForm>
            </div>
        );
    }
}