import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { MenuItem, SelectField, RaisedButton, CardHeader, CardText, Card } from 'material-ui';
import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';

export class PurchaseCreator extends React.Component<{ categories: PurchaseCategory[], submitPurchase: any }, { purchase: Purchase}> {

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

    render () {
        const { purchase } = this.state;
        let cats = null;
        if (this.props.categories.length !== 0) {
            cats = this.props.categories.map((cat, index) => (
                <MenuItem key={index} value={cat.id} primaryText={cat.name} />
            ));
        }

        return (
            <Card>
                <CardHeader
                    title="Add a purchase"
                    actAsExpander={true}
                />
                <CardText
                    expandable={true}
                >
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                    >
                        <TextValidator
                            name="amount"
                            type="number"
                            floatingLabelText="Amount"
                            onChange={this.handleChange}
                            value={purchase.amount}
                        /><br/>
                        <TextValidator
                            name="description"
                            type="text"
                            floatingLabelText="Description"
                            onChange={this.handleChange}
                            value={purchase.description}
                        /><br/>
                        <SelectField
                            floatingLabelText="Category"
                            value={purchase.purchase_category_id}
                            onChange={this.handleCatChange}
                        >
                            {cats}
                        </SelectField><br/>
                        <RaisedButton label="Create" type="submit" />
                    </ValidatorForm>
                </CardText>
            </Card>
        );
    }

    handleSubmit = () => {
        this.props.submitPurchase(this.state.purchase);
    }

    handleCatChange = (event, index, value) => {
        const { purchase } = this.state;
        purchase.purchase_category_id = value;
        this.setState({purchase: purchase});
    }

    handleChange = (event) => {
        const { purchase } = this.state;
        purchase[event.target.name] = event.target.value;
        this.setState({purchase: purchase});
    } 
}