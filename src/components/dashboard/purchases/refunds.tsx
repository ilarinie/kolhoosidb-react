import * as React from 'react';
import { Refund } from '../../../store/models/refund';
import { RaisedButton, MenuItem, SelectField } from 'material-ui';
import { User } from '../../../store/models/user';
import { inject, observer } from 'mobx-react';
import { MainState } from '../../../store/state';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

interface RefundPanelProps {
    mainState: MainState;
}
@inject('mainState')
@observer
export class RefundPanel extends React.Component<RefundPanelProps, {}> {

    cancelRefund = (refund: Refund) => {
        console.log('asd');
    }

    acceptRefund = (refund: Refund) => {
        console.log('asd');
    }

    createRefund = (refund: Refund) => {
        console.log('asd');
    }

    submitRefund = (refund: Refund) => {
        this.props.mainState.purchaseState.createRefund(refund);
    }

    render() {
        let newUsers = [];
        newUsers = this.props.mainState.communeState.selectedCommune.users.filter((el) => {
            return el.id !== this.props.mainState.userState.current_user.id;
        });
        let sent_refunds = this.props.mainState.userState.current_user.sent_refunds.map((refund: Refund, index: number) => (
            <RefundRow refund={refund} key={index} sent={true} handleChange={this.cancelRefund} />
        ));
        let received_refunds = this.props.mainState.userState.current_user.received_refunds.map((refund: Refund, index: number) => (
            <RefundRow refund={refund} key={index} sent={false} handleChange={this.acceptRefund} />
        ));
        return (
            <div>
                <h3>Sent Refunds</h3>
                {sent_refunds}
                <h3>Received Refunds</h3>
                {received_refunds}
                <h3>New Refund</h3>
                <RefundCreator users={newUsers} handleSubmit={this.submitRefund} />
            </div>
        );
    }
}

interface RefundRowProps {
    refund: Refund;
    sent: boolean;
    handleChange: any;
}

export class RefundRow extends React.Component<RefundRowProps, {}> {
    render() {
        if (this.props.sent) {
            return (
                <div>
                    {this.props.refund.from} --> {this.props.refund.to}: {this.props.refund.amount} €
                    <RaisedButton label="Cancel" />
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.refund.from} --> {this.props.refund.to}: {this.props.refund.amount} €
                    <RaisedButton label="Accept" />
                </div>
            );
        }
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
            users = this.props.users.map((user, index) => (
                <MenuItem className={'user-' + index} key={index} value={user.id} primaryText={user.name} />
            ));
        }
        return (
            <div>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <SelectField
                        className="purchase-category-selector"
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
                    <RaisedButton label="Submit" type="submit" />
                </ValidatorForm>
            </div>
        );
    }
}