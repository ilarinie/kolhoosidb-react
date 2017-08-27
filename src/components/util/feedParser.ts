import { FeedItem } from '../../store/models/feed_item';

export const getAction = (feedItem: FeedItem): string => {
    if (feedItem.action.includes('create')) {
        return 'created';
    }
    if (feedItem.action.includes('update')) {
        return 'updated';
    }
    if (feedItem.action.includes('destroy')) {
        return 'deleted';
    }
    return feedItem.action;
};