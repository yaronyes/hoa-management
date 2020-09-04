import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddUpdateVoting from '../../components/voting/AddUpdateVoting';
import VotingCard from '../../components/voting/VotingCard';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ActiveVotes.css';
import selectVoting from '../../selectors/votingSelector';
import { getVoting } from '../../actions/votingActions';
import Spinner from '../spinner/Spinner';

const ActiveVotes = ({ loader, votes, auth, getVoting, filteredVoting, viewOnlyMode=false, votingIdToShow }) => {
    const [modal, setModel] = useState(false);
    const [collapseID, setCollapseID] = useState(0);    
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [filter, setFilter] = useState([]);

    useEffect(() => {        
        if(filter.length > 0/* && collapseID === 0*/) {
            if(votingIdToShow && filter.find(vote => vote._id === votingIdToShow)) {
                setCollapseID(votingIdToShow);
            } else if(collapseID === 0) {
                setCollapseID(filter[0]._id);
            }                
        }        
    }, [filter, votingIdToShow]);

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        } else {
            setFilter(!viewOnlyMode ? filteredVoting : filteredVoting.filter(voting => !voting.isVotedByTenant(auth.user._id)));                         
        }
      }, [votes]);
    
    const toggle = () => {
        setModel(!modal);
    }

    const openAddUpdateModal = voting => {
        setSelectedVoting(voting);      
        toggle();
    }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
        
    const displayActiveVotes = filter.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} onUpdateVoting={openAddUpdateModal} isActiveVoting={item.isActiveVoting()}/>);    
      
    if(loader.loadingVotes) {
        return <Spinner />
    }
    
    return (
        <div className="active-votes">                     
            <MDBRow className={!viewOnlyMode ? "new-voting-row" : " new-voting-row-hide"}>
                <MDBCol className={!auth.user.isCommitteeMember ? "new-voting-btn-hide" : "ml-auto"} md="5">
                    <RoundedBtn color="primary" onClick={() => openAddUpdateModal(null)} icon="person-booth" caption="New Voting" />
                </MDBCol>                            
            </MDBRow>
            <MDBRow className="voting-row">                            
                <MDBCol>                        
                    {displayActiveVotes}
                </MDBCol>
            </MDBRow>                
            <AddUpdateVoting modal={modal} toggle={toggle} votingToUpdate={selectedVoting}/>   
        </div>
    );
}

ActiveVotes.propTypes = {
    auth: PropTypes.object.isRequired,
    loader: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    filteredVoting: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    votes: state.voting,
    filteredVoting: selectVoting(state.voting, state.votingFilters, true)
});

export default connect(mapStateToProps, { getVoting })(ActiveVotes);
