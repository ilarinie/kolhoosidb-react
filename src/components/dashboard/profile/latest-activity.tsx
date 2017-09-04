import * as React from 'react';
import { Purchase } from '../../../store/models/purchase';

export class LatestActivityComponent extends React.Component<{feed: any}, {}> {
    constructor(props: any) {
        super(props);
        
    }
    render() {
        let feed = this.props.feed.map((item, index) => {
            if (typeof item === 'Purchase') {
                return <div>asd</div>;
            } else {
                return <p>asd</p>;
            }
        });
        return (
            <div>
                {feed}
            </div>
        );
    }
}