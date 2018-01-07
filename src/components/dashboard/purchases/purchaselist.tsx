import * as React from 'react';
import ReactTable from 'react-table';
import { Purchase } from '../../../store/models/purchase';
import 'react-table/react-table.css';
import { FlatButton } from 'material-ui';
import { currencyFormatter } from '../../../domain/formatter/currencyFormatter';
import { Checkbox } from 'material-ui';
import TiCancel from 'react-icons/lib/ti/cancel';

const getAveragePurchase = (purchases: any[]): number => {
    let sum = 0;
    purchases.map((purchase, index) => {

        sum = sum + parseFloat(purchase.amount);
    });
    return sum / purchases.length;
};

interface PurchaseListProps {
    purchases: Purchase[];
    current_user_id: number;
    deletePurchase: any;
    totalPurchases: number;
    averagePurchase: number;
}

interface PurchaseListState {

}

export class PurchaseList extends React.Component<PurchaseListProps, PurchaseListState> {

    columnStyle = {
        padding: '15px 5px',
        font: 'Roboto Sans',
    };

    columns = [
        {
            Header: 'Name',
            accessor: 'name',
            filterMethod: (filter, row) => {
                if (filter.value) {
                    return row._original.user_id === this.props.current_user_id;
                } else {
                    return true;
                }
            },
            Filter: ({ filter, onChange }) => (
                <span style={{ fontSize: '11px' }}>
                    <Checkbox
                        style={{ marginLeft: '-15px', marginTop: '5px', float: 'left', maxWidth: '5px' }}
                        onCheck={(event, selected) => onChange(selected)}
                    />Only show<br />my purchases
                </span>
            ),
            Footer: (
                <span>
                    <strong style={{ fontSize: '11px' }}>Average amount</strong><br />
                    {currencyFormatter.format(getAveragePurchase(this.props.purchases))}
                </span>
            )
        },
        {
            Header: 'Amount',
            id: 'amount',
            accessor: purchase => currencyFormatter.format(purchase.amount),
            filterable: false,
            Footer: (
                <span>
                    <strong style={{ fontSize: '11px' }}>Total</strong><br />
                    {currencyFormatter.format(this.props.totalPurchases)}
                </span>
            )
        },
        {
            Header: 'Category',
            accessor: 'category',
            Footer: (
                <span>
                    <strong style={{ fontSize: '11px' }}>Average per member</strong><br />
                    {currencyFormatter.format(this.props.averagePurchase)}
                </span>
            )
        }
    ];

    getColumnStyle = () => {
        return { style: this.columnStyle };
    }

    getTableStyle = () => {
        return {
            style: {
                color: '#424242'
            }
        };
    }

    render() {
        return (
            <div style={{ marginTop: '-5px' }}>
                <ReactTable
                    data={this.props.purchases}
                    columns={this.columns}
                    defaultPageSize={8}
                    className="-striped -highlight"
                    filterable={true}
                    SubComponent={row => (
                        <PurchaseDetails
                            row={row}
                            current_user_id={this.props.current_user_id}
                            deletePurchase={this.props.deletePurchase}
                        />
                    )}
                    getTdProps={this.getColumnStyle}
                    getThProps={this.getColumnStyle}
                    getTableProps={this.getTableStyle}
                />
            </div>
        );
    }
}

interface PurchaseDetailsProps {
    row: any;
    current_user_id: number;
    deletePurchase: any;
}

interface PurchaseDetailsState {

}

export class PurchaseDetails extends React.Component<PurchaseDetailsProps, PurchaseDetailsState> {

    subComponentStyles = {
        padding: '15px 15px',
        fontSize: '13px'
    };

    render() {
        let deleteButton = null;
        if (this.props.current_user_id === this.props.row.original.user_id && this.props.row.original.category !== 'Refund') {
            deleteButton = (
                <FlatButton
                    onClick={this.deletePurchase}
                    label="Delete"
                    icon={<TiCancel style={{ color: 'red' }} />}
                    primary={true}
                    style={{ float: 'right' }}
                />
            );
        }
        let date = new Date(this.props.row.original.created_at);
        return (
            <div style={this.subComponentStyles}>
                "{this.props.row.original.description}"<br />
                {date.toLocaleDateString('fi-FI')}<br />
                {date.toLocaleTimeString('fi-FI')}
                {deleteButton}
            </div>
        );
    }

    deletePurchase = () => {
        this.props.deletePurchase(this.props.row.original as Purchase);
    }
}