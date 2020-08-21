import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddUpdateVoting from '../../components/voting/AddUpdateVoting';
import VotingCard from '../../components/voting/VotingCard';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVoting } from '../../actions/votingActions';

const VotingPage = ({ getVoting, votes }) => {
    const [modal, setModel] = useState(false);
    const [collapseID, setCollapseID] = useState(0);    
    const [selectedVoting, setSelectedVoting] = useState();

    useEffect(() => {
        if(votes.length === 0) {
            getVoting();
        }      
      }, [votes]);
    
    const toggle = () => {
        setModel(!modal);
    }

    const openAddUpdateModal = message => {
        setSelectedVoting(message);      
        toggle();
      }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');

    const displayVotes = votes.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} onUpdateMessage={openAddUpdateModal}/>);
      
    return (
        <div className="voting-page">
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBRow>
                            <MDBCol>
                                <RoundedBtn color="primary" onClick={() => toggle()} icon="user-plus" caption="Create New Voting"/>
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>                            
                            <MDBCol>
                                Active Votes
                                {displayVotes}
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                Voting
                            </MDBCol>                            
                        </MDBRow>
                    </MDBCol>
                    <MDBCol>
                        <MDBRow>
                            <MDBCol>
                            Filter
                            </MDBCol>                            
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                Voting Results
                                {displayVotes}
                            </MDBCol>                            
                        </MDBRow>                        
                        <MDBRow>
                            <MDBCol>
                            Voting    
                            </MDBCol>                                                                                    
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>        
            <AddUpdateVoting modal={modal} toggle={toggle} />   
        </div>
    );
}

VotingPage.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    getVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting
});

export default connect(mapStateToProps, { getVoting })(VotingPage);
