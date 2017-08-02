import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';

export class KolhoosiNavItem extends React.Component<{path: string, text: string, onTouchTap: any, disabled: boolean}, {}> {
    render() {
        return (
            <Link to={this.props.path} style={{textDecoration: 'none'}}>
                <MenuItem disabled={this.props.disabled} onTouchTap={this.props.onTouchTap}>{this.props.text}</MenuItem>
            </Link>
        );
    }}