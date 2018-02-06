import * as React from 'react';
import { TableCell } from 'material-ui';
import { currencyFormatter } from '../../domain/formatter/currencyFormatter';

export class DiffColumn extends React.Component<{ diff: number }, {}> {

    rowStyle;

    constructor(props: any) {
        super(props);
        if (this.props.diff < 0) {
            this.rowStyle = {
                background: 'red'
            };
        } else {
            this.rowStyle = {
                background: 'green'
            };
        }
    }

    render() {
        let diff = currencyFormatter.format(this.props.diff);
        return (
            <TableCell style={this.rowStyle}>{diff}</TableCell>
        );
    }
}