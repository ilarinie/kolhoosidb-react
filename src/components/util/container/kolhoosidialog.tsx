import * as React from 'react';
import { Dialog } from 'material-ui';
import { FaClose } from 'react-icons/lib/fa';
import { WithStyles } from 'material-ui/styles/withStyles';
import { decorate, style } from '../../../theme';
import { compose } from 'recompose';

interface KolhoosiDialogProps {
    actions?: any;
    open: boolean;
    title: string;
    handleClose: any;
}

interface KolhoosiDialogState {

}

class KolhoosiDialog extends React.Component<KolhoosiDialogProps & WithStyles, KolhoosiDialogState> {

    headerStyles = {
        background: 'red',
        width: '100%',
        textAlign: 'center',
        height: '50px',
        paddingTop: '17px',
        color: 'white'
    };

    containerStyles = {
        width: '400px',
        marginTop: '-16px',
        height: '550px',
        maxHeight: '99vh'
    };

    contentStyles = {
        padding: '20px 50px',
        color: 'grey',

    };
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                className="kolhoosidialog"
            >
                <div style={this.containerStyles}>
                    <div style={this.headerStyles}>
                        <p> {this.props.title} </p>
                        <span
                            style={{
                                float: 'right',
                                marginTop: '-37px',
                                marginRight: '20px',
                                fontSize: '20px',
                                cursor: 'pointer'
                            }}

                        ><FaClose style={{ fill: 'white' }} onClick={this.props.handleClose} />
                        </span>
                    </div>
                    <div style={this.contentStyles}>
                        {this.props.children}
                    </div>
                </div>
            </Dialog >
        );
    }
}

export default compose<KolhoosiDialogProps, any>(
    decorate,
    style
)(KolhoosiDialog);