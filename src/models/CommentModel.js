export default class CommentModel {
    constructor({ text, createdBy, committee, reply, createdAt, updatedAt }) {
        this.text = text;
        this.createdAt = createdBy;
        this.committee = committee;
        this.reply = reply;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}