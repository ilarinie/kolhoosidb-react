import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { MenuItem, SelectField, RaisedButton, CardHeader, CardText, Card } from 'material-ui';
import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';
import { KolhoosiCardTitle } from '../../util/card-title';
import { FaEur } from 'react-icons/lib/fa';

interface PurchaseCreatorProps {
    categories: PurchaseCategory[];
    submitPurchase: any;
    expandable: boolean;
}

export class PurchaseCreator extends React.Component<PurchaseCreatorProps, { purchase: Purchase }> {

    textFieldStyle = {
        width: '95%'
    };

    constructor(props: any) {
        super(props);
        let purchase: any = {};
        purchase.description = '';
        purchase.amount = '';
        purchase.category = this.props.categories[0];
        this.state = {
            purchase: purchase
        };
    }

    render() {
        const { purchase } = this.state;
        let cats = null;
        if (this.props.categories.length !== 0) {
            cats = this.props.categories.map((cat, index) => (
                <MenuItem key={index} value={cat.id} primaryText={cat.name} />
            ));
        }
        return (
            <div>
                <h2>Create a new purchase</h2>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <TextValidator
                        style={this.textFieldStyle}
                        name="amount"
                        type="number"
                        floatingLabelText="Amount"
                        onChange={this.handleChange}
                        value={purchase.amount}
                    /><FaEur /><br />
                    <TextValidator
                        style={this.textFieldStyle}
                        name="description"
                        type="text"
                        floatingLabelText="Description"
                        onChange={this.handleChange}
                        value={purchase.description}
                    /><br />
                    <SelectField
                        style={this.textFieldStyle}
                        floatingLabelText="Category"
                        value={purchase.purchase_category_id}
                        onChange={this.handleCatChange}
                    >
                        {cats}
                    </SelectField><br />
                    <RaisedButton label="Create" type="submit" />
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