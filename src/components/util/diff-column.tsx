import * as React from 'react';
import { TableRowColumn } from 'material-ui';
import { currencyFormatter } from './currencyFormatter';

export class DiffColumn extends React.Component <{ diff: number }, {} > {

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
                <TableRowColumn style={this.rowStyle}>{diff}</TableRowColumn>
            );
        }
}