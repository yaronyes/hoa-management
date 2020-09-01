import CommentModel from './CommentModel';
import config from '../config/config.json';

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
    }

    getImageUrl = (fullSize = false) => fullSize ? `${config.server_url}/messages/${this._id}/imageOrigSize?${new Date().getTime()}`
                                                 : `${config.server_url}/messages/${this._id}/image?${new Date().getTime()}`
}