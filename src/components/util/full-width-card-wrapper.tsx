import * as React from 'react';
import { Card } from 'material-ui/Card';
import { CardHeader, CardText } from 'material-ui';

interface FullWidthCardWrapperProps {
    title: string;
    iconClassName: string;
    hidden: boolean;
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
        let title = (<p style={{ fontFamily: 'Roboto' }}><i  className={this.props.iconClassName} style={{ marginRight: '10px' }}> {this.props.title}</i></p>);
        return (
            <Card style={this.getCardStyle()}>
                <CardHeader
                    title={title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText
                    expandable={true}
                >
                    {this.props.children}
                </CardText>
            </Card>    
        );
    }
}