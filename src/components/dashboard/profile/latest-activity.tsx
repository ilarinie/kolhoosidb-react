import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';

export class LatestActivityComponent extends React.Component<{ feed: any }, {}> {
    constructor(props: any) {
        super(props);

    }
    render() {
        let feed = this.props.feed.map((item, index) => {
            if (item.amount) {
                return <div>{item.amount}</div>;
            } else {
                return <div>{item.name}</div>;
            }
        });
        return (
            <div>
                {feed}
            </div>
        );
    }
}