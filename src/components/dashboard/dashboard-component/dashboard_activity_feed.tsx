import * as React from 'react';
import { FeedItem } from '../../../store/models/feed_item';
import { getAction, getDescription, getAdditionalInformation } from '../../../domain/parser/feedParser';
import * as moment from 'moment';
import { compose } from 'recompose';
import { WithStyles } from 'material-ui';
import { decorate } from '../../../theme';
import { inject } from 'mobx-react';

class DashboardActivityFeed extends React.Component<{ feed: FeedItem[], getFeed: any } & WithStyles, {}> {

    handle: any;

    componentDidMount() {
        // this.props.getFeed();
    }

    componentWillUnmount() {
        clearInterval(this.handle);
    }

    render() {
        let feed = this.props.feed.map((feedItem, index) => (
            <FeedItemComponent key={index} feedItem={feedItem} />
        ));

        return (
            <div>
                {feed}
            </div>
        );
    }
}

export default compose<{ feed: FeedItem[], getFeed: any } & WithStyles, any>(
    decorate,
)(DashboardActivityFeed);

export class FeedItemComponent extends React.Component<{ feedItem: FeedItem }, {}> {
    constructor(props: any) {
        super(props);

    }
    render() {
        return (
            <div>
                {this.props.feedItem.actorname} {getAction(this.props.feedItem)} {getDescription(this.props.feedItem)}<br />
                <small>{getAdditionalInformation(this.props.feedItem)}</small><br />
                <small>{moment(this.props.feedItem.created_at).fromNow()}</small>
                <hr />
            </div>
        );
    }
}