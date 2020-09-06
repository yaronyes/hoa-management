import { sortByDate } from '../utils/utils';

export default (votes, { text, sortBy }, isActiveVoting, sortDirection) =>     
    isActiveVoting
        ? votes.filter(voting => voting.isActiveVoting()).sort((a, b) => sortByDate(a[sortBy], b[sortBy], sortDirection))
        : votes.filter(voting => !voting.isActiveVoting() &&
         ((voting.title.toLowerCase().includes(text.toLowerCase().trim())) || (voting.details.toLowerCase().includes(text.toLowerCase().trim()))))
         .sort((a, b) => sortByDate(a[sortBy], b[sortBy], sortDirection));  
    

    