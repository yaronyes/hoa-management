export default class VoteModel {
    constructor({ votedBy, committee, vote, createdAt, updatedAt }) {
        this.votedBy = votedBy;
        this.committee = committee;
        this.vote = vote;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}