export default (votes, { text }, isActiveVoting) => {    
    if(isActiveVoting) {
        return votes.filter(voting => voting.isActiveVoting());
    } else {        
        return votes.filter(voting => !voting.isActiveVoting() &&
         ((voting.title.toLowerCase().includes(text.toLowerCase().trim())) || (voting.details.toLowerCase().includes(text.toLowerCase().trim()))));  
    }
}
    