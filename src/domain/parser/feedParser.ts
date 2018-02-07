import { FeedItem } from '../../store/models/feed_item';
import { currencyFormatter } from '../formatter/currencyFormatter';

const COMPLETION = 'task_completion';

const PURCHASE = 'purchase';

const TASK = 'task';

export const getAction = (feedItem: FeedItem): string => {
    if (feedItem.action.includes(PURCHASE)) {
        return getPurchaseAction(feedItem);
    }
    if (feedItem.action.includes(COMPLETION)) {
        return getTaskCompletionAction(feedItem);
    }
    if (feedItem.action.includes(TASK)) {
        return getTaskAction(feedItem);
    }
    return feedItem.action;
};

export const getAdditionalInformation = (feedItem: FeedItem): string => {
    if (feedItem.action.includes(PURCHASE)) {
        return getPurchaseInformation(feedItem);
    }
    if (feedItem.action.includes(COMPLETION)) {
        return getTaskCompletionInformation(feedItem);
    }
    if (feedItem.action.includes(TASK)) {
        return getTaskInformation(feedItem);
    }

    return feedItem.action;
};

export const getDescription = (feedItem: FeedItem): string => {
    return feedItem.parameters && feedItem.parameters.target_description ? feedItem.parameters.target_description : feedItem.trackablename;
};

const getPurchaseAction = (feedItem: FeedItem): string => {
    if (feedItem.action.includes('create')) {
        return 'bougth';
    }
    if (feedItem.action.includes('update')) {
        return 'updated a purchase:';
    }
    if (feedItem.action.includes('destroy')) {
        return 'deleted a purchase:';
    }
    return feedItem.action;
};

const getTaskCompletionAction = (feedItem: FeedItem): string => {
    if (feedItem.action.includes('create')) {
        return 'completed ';
    }
    if (feedItem.action.includes('destroy')) {
        return 'removed completion: ';
    }
    return feedItem.action;
};

const getPurchaseInformation = (feedItem: FeedItem): string => {
    if (feedItem.parameters && feedItem.parameters.additional_information) {
        return 'Cost: ' + currencyFormatter.format(parseFloat(feedItem.parameters.additional_information));
    } else {
        return '';
    }

};

const getTaskCompletionInformation = (feedItem: FeedItem): string => {
    if (feedItem.parameters && feedItem.parameters.additional_information) {
        return 'Got: ' + feedItem.parameters.additional_information + ' points';
    } else {
        return '';
    }
};

const getTaskInformation = (feedItem: FeedItem): string => {
    if (feedItem.parameters && feedItem.parameters.additional_information) {
        return feedItem.parameters.additional_information;
    } else {
        return '';
    }
};

const getTaskAction = (feedItem: FeedItem): string => {
    if (feedItem.action.includes('create')) {
        return 'created a task: ';
    }
    if (feedItem.action.includes('update')) {
        return 'updated a task: ';
    }
    if (feedItem.action.includes('destroy')) {
        return 'deleted a task: ';
    }
    return feedItem.action;
};