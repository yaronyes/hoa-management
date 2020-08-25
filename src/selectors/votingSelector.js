export default (votes, { text }, isActiveVoting) =>     
    isActiveVoting
        ? votes.filter(voting => voting.isActiveVoting())
        : votes.filter(voting => !voting.isActiveVoting() &&
         ((voting.title.toLowerCase().includes(text.toLowerCase().trim())) || (voting.details.toLowerCase().includes(text.toLowerCase().trim()))));  
    

    