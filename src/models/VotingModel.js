import VoteModel from './VoteModel';

export default class VotingModel {
    constructor({ _id, createdBy, committee, title, details, voteOptions = [], dueDate, completed, votes = [], createdAt, updatedAt }) {
        this._id = _id;
        this.createdBy = createdBy;
        this.committee = committee;
        this.title = title;
        this.details = details;
        this.voteOptions = voteOptions;
        this.dueDate = dueDate;
        this.completed = completed;
        this.votes = votes.map(vote => new VoteModel(vote));
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getVotingResult = () => {
        const results = [];
        if(!this.isActiveVoting) {
            this.voteOptions.forEach(option => {
                const numberOfVotes = this.votes.filter(vote => vote.vote === option).length;
                results.push({ 
                    option,
                    numberOfVotes
                 });
            });

            results.sort((a, b) => a.numberOfVotes - b.numberOfVotes);
        }

        return results;
    }

    isActiveVoting = () => {
        const now = new Date();
        return now < this.dueDate;
    }
}