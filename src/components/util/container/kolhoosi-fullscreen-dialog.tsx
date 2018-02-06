import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { Dialog, AppBar, Toolbar } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton/IconButton';
import { MdKeyboardBackspace } from 'react-icons/lib/md';
import Typography from 'material-ui/Typography/Typography';

interface KolhoosiFullScreenDialogProps {
    open: boolean;
    onClose: any;
    title?: string;
    rightActionIcon?: React.ReactElement<any>;
    rightAction?: any;
    closeAfterAction?: boolean;
}

interface KolhoosiFullScreenDialogState {

}

class KolhoosiFullScreenDialogImpl extends React.Component<KolhoosiFullScreenDialogProps & WithStyles, KolhoosiFullScreenDialogState> {

    timeout: any;

    constructor(props: any) {
        super(props);
    }

    onRightActionClick = () => {
        this.props.rightAction();
        if (this.props.closeAfterAction) {
            this.timeout = setTimeout(
                () => {
                    this.props.onClose();
                },
                2000
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = 0;
    }

    render() {
        let rightAction = null;
        if (this.props.rightAction && this.props.rightActionIcon) {
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
            <Dialog
                fullScreen={true}
                open={this.props.open}
                onClose={this.props.onClose}
            >
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
                <div style={{ paddingTop: 64 }}>
                    {this.props.children}
                </div>
            </Dialog>
        );
    }
}

export const KolhoosiFullScreenDialog = compose<KolhoosiFullScreenDialogProps, any>(
    decorate,
    style,
    observer,
)(KolhoosiFullScreenDialogImpl);

export default KolhoosiFullScreenDialog;