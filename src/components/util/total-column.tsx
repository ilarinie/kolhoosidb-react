import * as React from 'react';
import { TableCell } from 'material-ui';
import { currencyFormatter } from '../../domain/formatter/currencyFormatter';

export class TotalColumn extends React.Component<{
    total: number
}, {}> {
    render() {
        let total = currencyFormatter.format(this.props.total);
        return (
            <TableCell >{total}</TableCell>
        );
    }
}