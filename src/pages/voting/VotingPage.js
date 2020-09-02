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
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';

const VotingPage = ({ loader, getVoting, votes, filteredVoting, onPageSelected }) => {
    const [collapseID, setCollapseID] = useState(0);
    const { votingId } = useParams();
    
    useEffect(() => onPageSelected('voting'), []);

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        } else if(collapseID === 0 && filteredVoting.length > 0) {
            setCollapseID(filteredVoting[0]._id);
        }              
      }, [votes]);
    
    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    const displayDoneVotes = filteredVoting.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} />);

    if(loader.loadingVotes) {
        return <Spinner />
    }
    
    return (
        <div className="voting-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="6">
                        <MDBRow className="row-active-voting d-flex justify-content-center">
                            <MDBCol className="blue-gradient p-3 white-text mx-3">
                                <h2 className="h2-responsive mb-2 font-weight-bold">Active Voting</h2>                                
                            </MDBCol>                            
                        </MDBRow>                        
                        <ActiveVotes votingIdToShow={votingId} />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="row-voting-results d-flex justify-content-center">
                            <MDBCol className="blue-gradient p-3 white-text mx-3">
                                <h2 className="h2-responsive mb-2 font-weight-bold">Voting Results</h2>
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
    loader: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired,
    filteredVoting: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    votes: state.voting,
    filteredVoting: selectVoting(state.voting, state.votingFilters, false)
});

export default connect(mapStateToProps, { getVoting })(VotingPage);
