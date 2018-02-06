import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { WithStyles } from 'material-ui/styles/withStyles';
import { AppBar, Toolbar, IconButton, Typography } from 'material-ui';
import { MdKeyboardBackspace } from 'react-icons/lib/md';

interface DialogAppBarProps {
    title?: string;
    rightActionIcon?: any;
    onRightActionClick?: any;
    onClose: any;
}

interface DialogAppBarState {

}

class DialogAppBarImpl extends React.Component<DialogAppBarProps & WithStyles, DialogAppBarState> {

    timeout: any;

    constructor(props: any) {
        super(props);
    }

    onRightActionClick = () => {
        this.props.onRightActionClick();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = 0;
    }

    render() {
        let rightAction = null;
        if (this.props.onRightActionClick && this.props.rightActionIcon) {
            rightAction = (
                <IconButton
                    style={{
                        color: this.props.theme.palette.primary.contrastText,
                        position: 'absolute',
                        right: 20,
                    }}
                    onClick={this.onRightActionClick}
                >
                    {this.props.rightActionIcon}
                </IconButton>
            );
        }
        return (
            <AppBar
                position="static"
            >
                <Toolbar >
                    <IconButton style={{ color: this.props.theme.palette.primary.contrastText }} onClick={this.props.onClose} >
                        <MdKeyboardBackspace />
                    </IconButton>
                    <Typography type="title" color="inherit">
                        {this.props.title || null}
                    </Typography>
                    {rightAction}
                </Toolbar>
            </AppBar>
        );
    }
}

export const DialogAppBar = compose<DialogAppBarProps, any>(
    decorate,
    style,
    observer
)(DialogAppBarImpl);

export default DialogAppBar;