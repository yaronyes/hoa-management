export default class CommentModel {
    constructor({ _id, text, createdBy, committee, reply, createdAt, updatedAt }) {
        this._id = _id;
        this.text = text;
        this.createdAt = createdBy;
        this.committee = committee;
        this.reply = reply;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}