import * as React from 'react';

export interface KolhoosiCardTitleProps {
    className: string;
    title: string;
}

export class KolhoosiCardTitle extends React.Component < KolhoosiCardTitleProps, {} > {
    render() {
        return (
            <p><i className={this.props.className} style={{marginRight: '10px'}}/>{this.props.title}</p>
        );
    }
}