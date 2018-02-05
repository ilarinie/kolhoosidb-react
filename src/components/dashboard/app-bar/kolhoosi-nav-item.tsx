import * as React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, ListItemIcon, ListItemText } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';

export interface KolhoosiNavItemProps {
    path: string;
    text: string;
    onClick: any;
    disabled: boolean;
    icon: any;
    iconColor: string;
    className: string;
}

class KolhoosiNavItem extends React.Component<KolhoosiNavItemProps & WithStyles, {}> {
    render() {
        return (
            <Link className={this.props.className} to={this.props.path} style={{ textDecoration: 'none' }}>
                <MenuItem
                    disabled={this.props.disabled}
                    onClick={this.props.onClick}
                >
                    <ListItemIcon className={this.props.classes.icon}>
                        {this.props.icon}
                    </ListItemIcon>
                    <ListItemText classes={{ primary: this.props.classes.primary }} inset={true} primary={this.props.text} />
                </MenuItem>
            </Link>
        );
    }
}

export default compose<KolhoosiNavItemProps, any>(
    decorate,
    style,
)(KolhoosiNavItem);