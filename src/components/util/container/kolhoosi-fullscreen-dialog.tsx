import * as React from 'react';
import { compose } from 'recompose';
import { decorate, style } from '../../../theme';
import { observer } from 'mobx-react';
import { Dialog, AppBar, Toolbar } from 'material-ui';
import { WithStyles } from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton/IconButton';
import { MdKeyboardBackspace } from 'react-icons/lib/md';
import Typography from 'material-ui/Typography/Typography';
import { DialogAppBar } from './dialog-appbar';

interface KolhoosiFullScreenDialogProps {
    open: boolean;
    onClose: any;
    title?: string;
    rightActionIcon?: React.ReactElement<any>;
    rightAction?: any;
    closeAfterAction?: boolean;
    style: any;
    contentStyle: any;
}

interface KolhoosiFullScreenDialogState {
    mobile: boolean;
}

class KolhoosiFullScreenDialogImpl extends React.Component<KolhoosiFullScreenDialogProps & WithStyles, KolhoosiFullScreenDialogState> {

    timeout: any;

    constructor(props: any) {
        super(props);
        this.state = {
            mobile: false
        };
    }

    componentDidMount() {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
            this.setState({
                mobile: false
            });
        } else {
            this.setState({
                mobile: true
            });
        }
    }

    onRightActionClick = () => {
        if (this.props.rightAction) {
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
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = 0;
    }

    render() {
        let appBar = null;
        if (this.state.mobile) {
            appBar = (
                <DialogAppBar
                    title={this.props.title}
                    rightActionIcon={this.props.rightActionIcon}
                    onRightActionClick={this.onRightActionClick}
                    onClose={this.props.onClose}
                />
            );
        }
        return (
            <Dialog
                fullScreen={this.state.mobile}
                open={this.props.open}
                onClose={this.props.onClose}
                style={this.props.style}
            >
                {appBar}
                <div style={this.props.contentStyle}>
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