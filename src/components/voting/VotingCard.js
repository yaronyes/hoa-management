import React, { useState } from 'react';
import {    
    MDBCol,
    MDBCollapse,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBView,
    MDBInput
} from 'mdbreact';
import './VotingCard.css';
import CardHeader from '../card-header/CardHeader';
import RoundedBtn from '../rounded-button/RoundedBtn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToolTipPieChart from '../charts/ToolTipPieChart';
import dateFormat from 'dateformat';
import DropDownSelect from '../select/DropDownSelect';
import { addVote } from '../../actions/votingActions';
import VoteModel from '../../models/VoteModel';

const VotingCard = ({ toggleCollapse, voting, openID,/* tenantMode=false,*/ onUpdateVoting, auth, addVote }) => {    
    const [vote, setVote] = useState("");
    const isActiveVoting = voting.isActiveVoting();
    
    const voteFor = () => {
        addVote(new VoteModel({ vote }), voting._id);
    };
    
    const votingPercentageForDisplay = [...voting.votesForDisplay, { 
        title: "None Voted",
        value: (auth.user.tenants.length !== 0) ? auth.user.tenants.length - voting.votes.length : 1,
        color: 'red'}].filter(item => item.value !== 0);
    
    const votingResultForDisplay = [...voting.votesForDisplay].filter(item => item.value !== 0);    
    // if(votingResultForDisplay.length === 0) {             
    //     votingResultForDisplay.push({ 
    //         title: "None Voted",
    //         value: 1,
    //         color: 'red'});                    
    // }
    
    const detailsColumnSize =  (isActiveVoting & auth.user.isCommitteeMember)  ? "8" : /*(isActiveVoting & !tenantMode) ? "12" :*/ "4";
    //const showDataCol = (isActiveVoting && auth.user.isCommitteeMember) || (!isActiveVoting) || (!tenantMode);
    const showDateCol = isActiveVoting && auth.user.isCommitteeMember;
    const showVoteCol = (isActiveVoting && !auth.user.isCommitteeMember && !voting.isVotedByTenant(auth.user._id));
        
    return (
        <div className="voting-card">
            <MDBCard style={{ backgroundColor: 'transparent' }}>                
                <CardHeader id={voting._id} toggleCollapse={toggleCollapse} headerText={voting.title}
                secondText={!isActiveVoting && voting.votes.length !== 0 ? voting.getVotingResult()[0].voteOptions : ""} />                
                <MDBCollapse id={voting._id} isOpen={openID === voting._id ? true :  false}>
                <MDBCardBody className="voting-card-body">
                    <MDBRow className="main-row">
                        <MDBCol md={detailsColumnSize} className="data-col">
                            <MDBRow>
                                <MDBCol>                                    
                                    <h5 className="p-details"><strong>Details: </strong><strong class="text-muted">{voting.details}</strong></h5>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                            { showDateCol
                               ? <MDBCol className="date-col">
                                    <h5 className="p-date"><strong className="l-title-date">End Date: </strong><strong class="text-muted">{dateFormat(voting.dueDate, "dd/mm HH:MM")}</strong></h5>                                                                         
                                    <RoundedBtn color="info" onClick={() => onUpdateVoting(voting)} icon="pen" caption="Update End Date" size="sm"/>                            
                                </MDBCol>
                               : null }                                        
                            </MDBRow>
                        </MDBCol>                        
                        { !isActiveVoting
                          ? <MDBCol md="4" className="voting-result">
                            {/* Results     */}
                            <ToolTipPieChart chartData={votingResultForDisplay} header="Results" isPercentage={false}/>
                         </MDBCol> 
                         : null}
                        { auth.user.isCommitteeMember || !isActiveVoting
                          ? <MDBCol md="4" className="voting-percentage">
                            {/* Voting Percentage */}
                            <ToolTipPieChart chartData={votingPercentageForDisplay} header="Voting Percentage" isPercentage={true}/>                            
                        </MDBCol>                        
                        : null } 
                    </MDBRow>
                    { showVoteCol
                    ?<MDBRow>
                        <MDBCol className="vote-select-col">                            
                            <DropDownSelect onChange={(userVote) => setVote(userVote)} label="Your vote:" icon="person-booth" dropDownItems={voting.voteOptions.map(option => ({ 
                                name: option,
                                value: option
                            }))} />                            
                        {/* </MDBCol>                         */}
                        {/* <MDBCol className="vote-btn-col mt-auto" style={{textAlign: "left"}}> */}
                            <RoundedBtn color="info" onClick={voteFor} icon="vote-yea" caption="Vote" size="sm"/>
                        </MDBCol>
                    </MDBRow>
                    : null} 
                </MDBCardBody>
                </MDBCollapse>
            </MDBCard>               
        </div>
    );
};

VotingCard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    votes: PropTypes.array.isRequired,
    addVote: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    votes: state.voting
});

export default connect(mapStateToProps, { addVote })(VotingCard);
