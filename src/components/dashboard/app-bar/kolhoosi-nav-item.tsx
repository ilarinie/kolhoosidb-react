import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import { FontIcon } from 'material-ui';
import FaUser from 'react-icons/lib/fa/user';

export interface KolhoosiNavItemProps {
    path: string;
    text: string;
    onClick: any;
    disabled: boolean;
    icon: any;
    iconColor: string;
    className: string;
}
export class KolhoosiNavItem extends React.Component<KolhoosiNavItemProps, {}> {
    render() {
        return (
            <Link className={this.props.className} to={this.props.path} style={{ textDecoration: 'none' }}>
                <MenuItem
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                    leftIcon={this.props.icon}
                >
                    {this.props.text}
                </MenuItem>
            </Link>
        );
    }
}