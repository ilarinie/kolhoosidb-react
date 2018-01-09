import { TextValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { MenuItem, SelectField, RaisedButton, CardHeader, CardText, Card, FlatButton } from 'material-ui';
import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';
import { KolhoosiCardTitle } from '../../util/card-title';
import { FaEur } from 'react-icons/lib/fa';

interface PurchaseCreatorProps {
    categories: PurchaseCategory[];
    showCancel?: boolean;
    cancelHandler?: any;
    submitPurchase: any;
    expandable: boolean;
}

export class PurchaseCreator extends React.Component<PurchaseCreatorProps, { purchase: Purchase }> {

    textFieldStyle = {
        width: '150px',
    };

    descriptionFieldStyle = {
        width: '350px'
    };

    selectStyle = {
        width: '150px',
    };
    constructor(props: any) {
        super(props);
        let purchase: any = {};
        purchase.description = '';
        purchase.amount = '';
        purchase.category = this.props.categories[0];
        purchase.purchase_category_id = this.props.categories[0].id;
        this.state = {
            purchase: purchase
        };
    }

    render() {
        const { purchase } = this.state;
        let cats = null;
        if (this.props.categories.length !== 0) {
            cats = this.props.categories.map((cat, index) => (
                <MenuItem className={'purchase-category-' + index} key={index} value={cat.id} primaryText={cat.name} />
            ));
        }
        return (
            <div style={{ color: '#424242' }}>
                <p>Create a new purchase</p>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <div style={{ float: 'left ', marginRight: '30px' }}>
                        <TextValidator
                            style={this.textFieldStyle}
                            name="amount"
                            type="number"
                            floatingLabelText="Amount"
                            onChange={this.handleChange}
                            value={purchase.amount}
                            validators={['required']}
                        /><FaEur />
                    </div>
                    <SelectField
                        className="purchase-category-selector"
                        style={this.selectStyle}
                        floatingLabelText="Category"
                        value={purchase.purchase_category_id}
                        onChange={this.handleCatChange}
                    >
                        {cats}
                    </SelectField><br /><br />
                    <TextValidator
                        style={this.descriptionFieldStyle}
                        name="description"
                        type="text"
                        floatingLabelText="Description"
                        onChange={this.handleChange}
                        value={purchase.description}
                        validators={['required']}
                    /><br />

                    <FlatButton
                        label="Create"
                        type="submit"
                        className="create-purchase-button"
                        style={{ color: 'green' }}
                    />

                </ValidatorForm>
            </div>
        );
    }

    handleSubmit = () => {
        this.props.submitPurchase(this.state.purchase);
    }

    handleCatChange = (event, index, value) => {
        const { purchase } = this.state;
        purchase.purchase_category_id = value;
        this.setState({ purchase: purchase });
    }

    handleChange = (event) => {
        const { purchase } = this.state;
        purchase[event.target.name] = event.target.value;
        this.setState({ purchase: purchase });
    }
}