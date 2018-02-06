import * as React from 'react';
import { Card } from 'material-ui';
import { CardHeader, CardContent } from 'material-ui';

interface FullWidthCardWrapperProps {
    title: string;
    icon: any;
    hidden?: boolean;
    classIdentifier: string;
}

interface FullWidthCardWrapperState {
    open: boolean;
}

export class FullWidthCardWrapper extends React.Component<FullWidthCardWrapperProps, FullWidthCardWrapperState> {
    constructor(props: any) {
        super(props);
    }

    getCardStyle = () => {
        if (this.props.hidden) {
            return { display: 'none' };
        } else {
            return {
                width: '100%',
                margin: '5px auto'
            };
        }
    }

    render() {
        let title = (<div style={{ padding: '10px 0' }}><span style={{ marginRight: '10px' }}>{this.props.icon} </span>  <span>{this.props.title}</span></div>);
        return (
            <Card style={this.getCardStyle()}>
                <CardHeader
                    title={title}

                    className={this.props.classIdentifier}
                />
                <CardContent
                >
                    {this.props.children}
                </CardContent>
            </Card>
        );
    }
}