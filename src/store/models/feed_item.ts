export class FeedItem {
    actorname: string;
    trackablename: string;
    action: string;
    created_at: Date;
    parameters: ExtraInformation;
}

class ExtraInformation {
    target_description: string;
    additional_information: string;
}