import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import AddUpdateVoting from '../../components/voting/AddUpdateVoting';
import VotingCard from '../../components/voting/VotingCard';
import RoundedBtn from '../../components/rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ActiveVotes.css';
// import { getVoting } from '../../actions/votingActions';

const ActiveVotes = ({ activeVotes }) => {
    const [modal, setModel] = useState(false);
    const [collapseID, setCollapseID] = useState(0);    
    const [selectedVoting, setSelectedVoting] = useState();

    // useEffect(() => {
    //     if(votes.length === 0) {
    //         getVoting();
    //     }      
    //   }, [votes]);
    
    const toggle = () => {
        setModel(!modal);
    }

    const openAddUpdateModal = message => {
        setSelectedVoting(message);      
        toggle();
      }

    const toggleCollapse = newCollapseID => setCollapseID(collapseID !== newCollapseID ? newCollapseID : '');
    
    // const activeVotes = votes.filter(voting => voting.isActiveVoting());
    const displayActiveVotes = activeVotes.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} onUpdateMessage={openAddUpdateModal} activeVoting={item.isActiveVoting()}/>);

    // const doneVotes = votes.filter(voting => !voting.isActiveVoting());
    // const displayDoneVotes = doneVotes.map(item => <VotingCard key={item._id} toggleCollapse={toggleCollapse} voting={item} openID={collapseID} onUpdateMessage={openAddUpdateModal} activeVoting={item.isActiveVoting()}/>);
      
    return (
        <div className="active-votes">
            {/* <MDBCol> */}
                <MDBRow className="active-votes-header">
                    <MDBCol style={{ textAlign: "left" }}>
                        <h1>Active Votes</h1>
                    </MDBCol>                            
                </MDBRow>
                <MDBRow>
                    <MDBCol className="ml-auto" md="5">
                        <RoundedBtn color="primary" onClick={() => toggle()} icon="person-booth" caption="New Voting"/>
                    </MDBCol>                            
                </MDBRow>
                <MDBRow>                            
                    <MDBCol>                        
                        {displayActiveVotes}
                    </MDBCol>                            
                </MDBRow>                
            {/* </MDBCol>        */}
            <AddUpdateVoting modal={modal} toggle={toggle} />   
        </div>
    );
}

ActiveVotes.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    //getVoting: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting
});

export default connect(mapStateToProps, { })(ActiveVotes);
