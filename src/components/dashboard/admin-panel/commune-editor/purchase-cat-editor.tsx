import * as React from 'react';
import { PurchaseCategory } from '../../../../store/models/purchase_category';
import { TextField, RaisedButton, CardText, Card, CardActions } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { FaPencil } from 'react-icons/lib/fa';
import { FullWidthCardWrapper } from '../../../util/full-width-card-wrapper';

export interface PurchaseCategoryEditorProps {
    createCategory: any;
    categories: PurchaseCategory[];
}

export class PurchaseCategoryEditor extends React.Component<PurchaseCategoryEditorProps, { purchaseCategory: PurchaseCategory }> {
    constructor(props: any) {
        super(props);
        let category: any = {};
        category.name = '';
        this.state = {
            purchaseCategory: category
        };
    }

    render() {
        let cats = null;
        if (this.props.categories) {
            cats = this.props.categories.map((cat, index) => (
                <Card key={index}>
                    <CardHeader
                        title={cat.name}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        <CardActions>
                            <p>todo</p>
                        </CardActions>
                    </CardText>
                </Card>
            ));
        }
        return (
            <div>
                <h4>Current categories</h4>
                {cats}
                <Card style={{ marginTop: '20px' }}>
                    <CardHeader
                        title="Add purchase category"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        expandable={true}
                    >
                        <TextField
                            name="name"
                            type="text"
                            floatingLabelText="Purchase Category Name"
                            value={this.state.purchaseCategory.name}
                            id="cat"
                            onChange={this.handleChange}
                        />
                        <CardActions>
                            <RaisedButton label="Create" onTouchTap={this.createCategory} />
                        </CardActions>
                    </CardText>
                </Card>
            </div>
        );
    }

    handleChange = (event) => {
        const { purchaseCategory } = this.state;
        purchaseCategory[event.target.name] = event.target.value;
        this.setState({ purchaseCategory });
    }

    createCategory = () => {
        this.props.createCategory(this.state.purchaseCategory);
    }
}