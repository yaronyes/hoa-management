import VoteModel from './VoteModel';

export default class VotingModel {
    constructor({ createdBy, committee, title, details, voteOptions = [], dueDate, completed, votes = [], createdAt, updatedAt }) {
        this.createdBy = createdBy;
        this.committee = committee;
        this.title = title;
        this.details = details;
        this.voteOptions = voteOptions;
        this.dueDate = dueDate;
        this.completed = completed;
        this.votes = votes.map(vote => new VoteModel({ ...vote }));
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}