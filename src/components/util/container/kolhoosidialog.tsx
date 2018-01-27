import * as React from 'react';
import { Dialog } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

interface KolhoosiDialogProps {
    actions?: any;
    open: boolean;
    title: string;
    handleClose: any;
}

interface KolhoosiDialogState {

}

export class KolhoosiDialog extends React.Component<KolhoosiDialogProps, KolhoosiDialogState> {

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
                actions={this.props.actions ? this.props.actions : null}
                modal={false}
                open={this.props.open}
                contentStyle={{
                    padding: '0px !important',
                    width: '400px'
                }}
                bodyStyle={{
                    style: {
                        padding: '0px'
                    },
                }}
                className="kolhoosidialog"
                autoScrollBodyContent={true}
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

                        ><NavigationClose style={{ fill: 'white' }} onClick={this.props.handleClose} />
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