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
    constructor({ createdBy, committee, title, details, priority, status, comments = [] , createdAt, updatedAt }) {
        this.createdBy = createdBy;
        this.committee = committee;
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.status = status;
        this.comments = comments.map(comment => new CommentModel({ ...comment }));
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}