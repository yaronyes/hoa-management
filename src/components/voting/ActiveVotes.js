import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import AddUpdateVoting from '../../components/voting/AddUpdateVoting';
import VotingCard from '../../components/voting/VotingCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ActiveVotes.css';
import selectVoting from '../../selectors/votingSelector';
import { getVoting } from '../../actions/votingActions';
import Spinner from '../spinner/Spinner';
import AccordionNav from '../../components/navbar/AccordionNav';

const ActiveVotes = ({ loader, votes, auth, filters, getVoting, filteredVoting, viewOnlyMode=false, votingIdToShow }) => {
    const [modal, setModel] = useState(false);
    const [collapseID, setCollapseID] = useState(0);    
    const [selectedVoting, setSelectedVoting] = useState(null);
    const [filter, setFilter] = useState([]);
    const [sortingDirection, setSortingDirection] = useState("asc");

    useEffect(() => {        
        if(filter.length > 0) {
            if(votingIdToShow && filter.find(vote => vote._id === votingIdToShow)) {
                setCollapseID(votingIdToShow);
            } else if(collapseID === 0) {
                setCollapseID(filter[0]._id);
            }                
        }        
    }, [filter, votingIdToShow]);

    useEffect(() => {
        if(votes.length === 0 && viewOnlyMode) {
            getVoting();
        } else if(votes.length > 0) {
            updateFilter();
        }
      }, [votes]);

    useEffect(() => {
        updateFilter();
    }, [sortingDirection]);

    const updateFilter = () => {
        setFilter(!viewOnlyMode ? filteredVoting(true, sortingDirection) : filteredVoting(true, sortingDirection).filter(voting => !voting.isVotedByTenant(auth.user._id))); 
    }
    
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
            </MDBRow>
            <MDBRow className="voting-row">                            
                <MDBContainer className='accordion md-accordion accordion-1'>
                  <AccordionNav showPlusIcon={auth.user.isCommitteeMember} plusClicked={() => openAddUpdateModal(null)} plusIcon="person-booth"
                   showSortingDirectionIcon={filters.sortBy === 'createdAt'} sortingDirectionClicked={(isUp) => setSortingDirection(isUp ? "asc" : "desc")}/>
                    { displayActiveVotes.length > 0
                    ? displayActiveVotes
                    : <h2 className="h2-responsive mb-2 font-weight-bold">No voting to show</h2> }                 
                </MDBContainer>
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
    filteredVoting: PropTypes.func.isRequired,
    getVoting: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,    
}

const mapStateToProps = state => ({
    auth: state.auth,
    loader: state.loader,
    errors: state.errors,
    votes: state.voting,
    filters: state.votingFilters,
    filteredVoting: (isActiveVoting, sortDirection) => selectVoting(state.voting, state.votingFilters, isActiveVoting, sortDirection)
});

export default connect(mapStateToProps, { getVoting })(ActiveVotes);
