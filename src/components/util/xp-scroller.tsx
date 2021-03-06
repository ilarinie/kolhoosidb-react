import * as React from 'react';
import { TopListItem } from '../../store/models/top_list_item';
import { observer } from 'mobx-react';
import { WithStyles } from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { decorate, style } from '../../theme';

interface XpScrollerProps {
    weekly: TopListItem[];
    monthly: TopListItem[];
    all_time: TopListItem[];
    getTopLists: any;
}

class XpScroller extends React.Component<XpScrollerProps & WithStyles, {}> {
    constructor(props: any) {
        super(props);

    }

    componentDidMount() {
        // this.props.getTopLists();
    }
    render() {
        return (
            <div>
                <TopListRow list={this.props.weekly} title="Weekly Top List" />
                <TopListRow list={this.props.monthly} title="Monthly Top List" />
                <TopListRow list={this.props.all_time} title="All Time Top List" />
            </div>
        );
    }
}

class TopListRow extends React.Component<{ list: TopListItem[], title: string }, {}> {
    constructor(props: any) {
        super(props);

    }
    render() {
        let items = this.props.list.map((item, index) => (
            <div key={index} style={{ padding: '5px' }}>
                {item.name}<br />
                <small>{item.points} points</small><br />
                <p
                    style={{ float: 'right', marginTop: '-27px', fontFamily: 'Lucida Console, Monospace' }}
                >
                    <b>{index + 1}.</b>
                </p>
                <hr />
            </div>
        ));
        return (
            <div>
                <h2>{this.props.title}</h2>
                {items}
            </div>
        );
    }
}

export default compose<XpScrollerProps, any>(
    decorate,
    style,
    observer,
)(XpScroller);