import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import VotingCard from '../../components/voting/VotingCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVoting } from '../../actions/votingActions';
import ActiveVotes from '../../components/voting/ActiveVotes';
import './VotingPage.css';
import selectVoting from '../../selectors/votingSelector';
import VotingFilter from '../../components/voting/VotingFilter';

const VotingPage = ({ getVoting, votes, filteredVoting }) => {
    const [collapseID, setCollapseID] = useState(0);
    
    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        } else if(collapseID === 0 && filteredVoting.length > 0) {
                setCollapseID(filteredVoting[0]._id);
            }              
      }, [votes]);
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    const displayDoneVotes = filteredVoting.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} /*onUpdateMessage={openAddUpdateModal}*/ /*isActiveVoting={item.isActiveVoting()}*//>);
      
    return (
        <div className="voting-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="6">                        
                        <ActiveVotes />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="row-voting-results">
                            <MDBCol style={{ textAlign: "left" }}>
                                <h1>Voting Results</h1>
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>                                                
                            <VotingFilter />
                        </MDBRow>                        
                        <MDBRow>
                            <MDBCol>                                
                                {displayDoneVotes}
                            </MDBCol>                                                                                    
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>        
        </div>
    );
}

VotingPage.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired,
    filteredVoting: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting,
    filteredVoting: selectVoting(state.voting, state.votingFilters, false)
});

export default connect(mapStateToProps, { getVoting })(VotingPage);
