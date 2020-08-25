import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddUpdateVoting from '../../components/voting/AddUpdateVoting';
import VotingCard from '../../components/voting/VotingCard';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVoting } from '../../actions/votingActions';
import ActiveVotes from '../../components/voting/ActiveVotes';
import FilterBox from '../../components/filter/FilterBox';
import './VotingPage.css';
import selectVoting from '../../selectors/votingSelector';
import VotingFilter from '../../components/voting/VotingFilter';

const VotingPage = ({ getVoting, votes, filteredVoting }) => {
    //const [modal, setModel] = useState(false);
    const [collapseID, setCollapseID] = useState(0);
    const [filterText, setFilter] = useState("");   
    //const [selectedVoting, setSelectedVoting] = useState();

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        }      
      }, [votes]);
    
    // const toggle = () => {
    //     setModel(!modal);
    // }

    // const openAddUpdateModal = message => {
    //     setSelectedVoting(message);      
    //     toggle();
    //   }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    //const activeVotes = votes.filter(voting => voting.isActiveVoting());    

    //const doneVotes = votes.filter(voting => !voting.isActiveVoting());
    //const filter = doneVotes.filter(item => (item.title.toLowerCase().includes(filterText.toLowerCase().trim())) || (item.details.toLowerCase().includes(filterText.toLowerCase().trim())));
    const displayDoneVotes = filteredVoting.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} /*onUpdateMessage={openAddUpdateModal}*/ /*isActiveVoting={item.isActiveVoting()}*//>);
      
    return (
        <div className="voting-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg="6">
                        {/* <MDBRow>
                            <MDBCol>
                                <RoundedBtn color="primary" onClick={() => toggle()} icon="user-plus" caption="Create New Voting"/>
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>                            
                            <MDBCol>
                                Active Votes
                                {displayActiveVotes}
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                Voting
                            </MDBCol>                            
                        </MDBRow> */}
                        <ActiveVotes />
                    </MDBCol>
                    <MDBCol lg="6">
                        <MDBRow className="row-voting-results">
                            <MDBCol style={{ textAlign: "left" }}>
                                <h1>Voting Results</h1>
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>
                            {/* <MDBCol>
                                <FilterBox onFilterChanged={(text) => setFilter(text)} label="Filter by text in Title and Details"/>
                            </MDBCol>                             */}
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
            {/* <AddUpdateVoting modal={modal} toggle={toggle} />    */}
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
