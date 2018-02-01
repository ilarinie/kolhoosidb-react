import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { ValidatorForm } from 'react-form-validator-core';
import { PurchaseCategory } from '../../../store/models/purchase_category';
import { MenuItem, SelectField, RaisedButton, CardHeader, CardText, Card, FlatButton } from 'material-ui';
import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';
import { KolhoosiCardTitle } from '../../util/card-title';
import { FaEur, FaChevronDown } from 'react-icons/lib/fa';
import { SubmitButton } from '../../util/submit-button';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import { KolhoosiLargeSelectField } from '../../util/kolhoosi-large-select-field';
import { KolhoosiLargeTextInput } from '../../util/kolhoosi-large-text-input';

interface PurchaseCreatorProps {
    categories: PurchaseCategory[];
    showCancel?: boolean;
    cancelHandler?: any;
    submitPurchase: any;
    expandable: boolean;
    loading: boolean;
}

export class PurchaseCreator extends React.Component<PurchaseCreatorProps, { purchase: Purchase }> {

    textFieldStyle = {
        width: '85%',
        textAlign: 'center'
    };

    descriptionFieldStyle = {
        width: '95%',
        color: 'gray'
    };

    selectStyle = {
        width: '95%',
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

    render() {
        const { purchase } = this.state;
        let cats = null;
        if (this.props.categories.length !== 0) {
            cats = this.props.categories.map((cat, index) => (
                <MenuItem className={'purchase-category-' + index} key={index} value={cat.id} primaryText={cat.name} />
            ));
        }
        return (
            <div style={{ maxWidth: '100vw', maxHeight: '65vh', padding: '1em', }}>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <KolhoosiLargeTextInput
                        label="What did you buy?"
                        validators={['required']}
                        multiline={true}
                        rows={2}
                        textareaStyle={{ color: 'gray' }}
                        name="description"
                        type="text"
                        currency={false}
                        value={purchase.description}
                        onChange={this.handleChange}
                        align="left"
                    />
                    <KolhoosiLargeTextInput
                        label="What did it cost?"
                        type="number"
                        name="amount"
                        onChange={this.handleChange}
                        validators={['required']}
                        value={purchase.amount}
                        currency={true}
                        align="center"
                    />
                    <KolhoosiLargeSelectField
                        label="How would you categorize it?"
                        onChange={this.handleCatChange}
                        value={this.state.purchase.purchase_category_id}
                        children={cats}
                    />
                    <div style={{ margin: '30px auto' }}>
                        <SubmitButton
                            label="Create"
                            type="submit"
                            className="create-purchase-button"
                            loading={this.props.loading}
                            fullWidth={true}
                            backgroundColor="#43A047"
                            labelStyle={{ color: 'white', fontSize: '20px' }}
                        />
                    </div>

                </ValidatorForm>
            </div >
        );
    }
}