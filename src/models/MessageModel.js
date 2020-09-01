import CommentModel from './CommentModel';

export const priority = {
    IMPORTANT: 'important',
    INFO: 'info'
};

export default class MessageModel {
    constructor({ _id, createdBy, committee, title, details, priority, comments = [], seenBy = [], haveImage, createdAt, updatedAt }) {
        this._id = _id;
        this.createdBy = createdBy;
        this.committee = committee;
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.comments = comments.map(comment => new CommentModel({ ...comment }));
        this.seenBy = seenBy;
        this.haveImage = haveImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.imageUpdateTime = new Date().getTime();
    }
}