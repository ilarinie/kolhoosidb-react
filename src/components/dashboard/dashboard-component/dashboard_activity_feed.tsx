import * as React from 'react';
import { FeedItem } from '../../../store/models/feed_item';
import { getAction } from '../../util/feedParser';
import * as moment from 'moment';

export class DashboardActivityFeed extends React.Component<{ feed: FeedItem[], getFeed: any}, { } > {
    
    handle: any;

    componentDidMount() {
        this.handle = setInterval(() => {
            this.props.getFeed();
        },                        10000);
    }

    componentWillUnmount() {
        clearInterval(this.handle);
    }

    render() {
        let feed = this.props.feed.map((feedItem, index) => (
            <li
                key={index}
                style={{listStyle: 'none'}}
            ><b>{feedItem.actorname}</b> {getAction(feedItem)} a {feedItem.trackablename} {moment(feedItem.created_at).fromNow()}</li>
        ));

        return (
            <div>
                <h4>Activity feed</h4>
                <ul>
                    {feed}
                </ul>
            </div>
        );
    }
}