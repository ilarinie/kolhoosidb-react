import { User } from '../../../store/models/user';
import * as React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import SubmitButton from '../../util/submit-button';
import { FaEur } from 'react-icons/lib/fa';
import { KolhoosiLargeSelectField } from '../../util/kolhoosi-large-select-field';
import { KolhoosiLargeTextInput } from '../../util/kolhoosi-large-text-input';
import { MenuItem } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';

interface RefundCreatorProps {
    handleSubmit: any;
    users: User[];
    loading: boolean;
}

class RefundCreator extends React.Component<RefundCreatorProps & WithStyles, { refund: any }> {

    containerStyles = {
        width: '300px'
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
        refund.to = event.target.value;
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
        let users = [(<MenuItem key={123} />)];
        if (this.props.users.length !== 0) {
            users = this.props.users.map((user, index) => {
                let kebabName = user.name.replace(/\ /g, '_');
                return (
                    <MenuItem className={'user-' + kebabName} key={index} value={user.id}>
                        {user.name}
                    </MenuItem>
                );
            });
        }
        return (
            <div style={this.containerStyles}>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <KolhoosiLargeSelectField
                        className="user-selector"
                        label="To"
                        value={refund.to}
                        onChange={this.handleUserChange}
                        children={users}
                    />
                    <KolhoosiLargeTextInput
                        name="amount"
                        label="Amount"
                        value={refund.amount}
                        onChange={this.handleChange}
                        validators={['required']}
                        type="number"
                        currency={true}
                        align="center"
                    />
                    <br />
                    <SubmitButton
                        className="submit-refund-button"
                        label="Create"
                        type="submit"
                        loading={this.props.loading}
                        fullWidth={true}
                        backgroundColor="#43A047"
                    />
                </ValidatorForm>
            </div>
        );
    }
}

export default compose<RefundCreatorProps, any>(
    decorate,
    style,
)(RefundCreator);