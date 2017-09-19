import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import { FontIcon } from 'material-ui';
import FaUser from 'react-icons/lib/fa/user';

export interface KolhoosiNavItemProps {
    path: string;
    text: string;
    onTouchTap: any;
    disabled: boolean;
    icon: any;
    iconColor: string;
}
export class KolhoosiNavItem extends React.Component<KolhoosiNavItemProps, {}> {
    render() {
        return (
            <Link to={this.props.path} style={{ textDecoration: 'none' }}>
                <MenuItem
                    disabled={this.props.disabled}
                    onTouchTap={this.props.onTouchTap}
                    leftIcon={this.props.icon}
                >
                    {this.props.text}
                </MenuItem>
            </Link>
        );
    }
}