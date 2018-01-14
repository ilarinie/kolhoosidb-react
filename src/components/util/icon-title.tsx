import * as React from 'react';

interface InconTitleProps {
    icon: any;
    titleText: string;
}

export const IconTitle: React.SFC<InconTitleProps> = (props) => {
    return (
        <div style={{ minHeight: '30px' }}> <div style={{ marginRight: '20px', marginTop: '-2px', float: 'left' }}>{props.icon}</div> <p>{props.titleText}</p></div>
    );
};