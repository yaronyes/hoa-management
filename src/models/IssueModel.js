import CommentModel from './CommentModel';
import config from '../config/config.json';

export const priority = {
    URGENT: 'urgent',
    IMPORTANT: 'important',
    NORMAL: 'normal' 
};

export const status = {
    OPEN: "open",
    CLOSE: "close"
}

export default class IssueModel {
    constructor({ _id, createdBy, committee, title, details, priority, status, haveImage, comments = [] , createdAt, updatedAt }) {
        this._id = _id;
        this.createdBy = createdBy;
        this.committee = committee;
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.status = status;
        this.haveImage = haveImage;
        this.comments = comments.map(comment => new CommentModel({ ...comment }));
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getImageUrl = (fullSize = false) => fullSize ? `${config.server_url}/issues/${this._id}/imageOrigSize?${new Date().getTime()}`
                                                 : `${config.server_url}/issues/${this._id}/image?${new Date().getTime()}`
}