export default class VoteModel {
    constructor({ _id, votedBy, committee, vote, createdAt, updatedAt }) {
        this._id = _id;
        this.votedBy = votedBy;
        this.committee = committee;
        this.vote = vote;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}