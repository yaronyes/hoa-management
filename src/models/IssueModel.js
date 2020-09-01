import CommentModel from './CommentModel';

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
}