import * as React from 'react';
import { TableRowColumn } from 'material-ui';
import { currencyFormatter } from './currencyFormatter';

export class TotalColumn extends React.Component < {
    total: number
}, {} > {
    render() {
        let total = currencyFormatter.format(this.props.total);
        return (
            <TableRowColumn >{total}</TableRowColumn>
        );
    }
}